import { Request, Response } from 'express';
import { ActiveSession } from '../models/ActiveSession';

/**
 * Get active session for a specific paper and user
 */
export const getActiveSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paperId } = req.params;
    const rawUserId = (req as any).user?.userId || (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || 'guest_user';

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const paperNumberMatch = paperId.match(/\d+/);
    const paperNum = paperNumberMatch ? parseInt(paperNumberMatch[0], 10) : null;
    const paperIdFilter = paperNum
      ? { $or: [{ paperId }, { paperId: new RegExp(`(?:tcf|paper|tef).*?${paperNum}(?:$|[^\d])`, 'i') }] }
      : { paperId };

    const queryFilter = rawUserId !== 'guest_user'
      ? { userId: String(rawUserId), ...paperIdFilter }
      : paperIdFilter;

    // Fetch the newest active session across all devices for this paper
    const session = await ActiveSession.findOne({
      ...queryFilter,
      lastUpdated: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
    }).sort({ lastUpdated: -1 });

    if (!session) {
      res.json({ success: true, activeSession: null });
      return;
    }

    res.json({
      success: true,
      activeSession: {
        paperId: session.paperId,
        examType: session.examType,
        sectionIndex: session.sectionIndex,
        questionIndex: session.questionIndex,
        answers: session.answers,
        sectionTimers: session.sectionTimers,
        sessionEpoch: session.sessionEpoch || 1,
        resetAt: session.resetAt,
        lastUpdated: session.lastUpdated
      }
    });
  } catch (error: any) {
    console.error('Error fetching active session:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch active session' });
  }
};

/**
 * Save or update active session (cloud auto-sync)
 */
export const saveActiveSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawUserId = (req as any).user?.userId || (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || req.headers['x-device-id'] || req.body.userId || 'guest_user';
    const { paperId, examType, sectionIndex, questionIndex, answers, sectionTimers, sessionEpoch } = req.body;

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const paperNumberMatch = paperId.match(/\d+/);
    const paperNum = paperNumberMatch ? parseInt(paperNumberMatch[0], 10) : null;
    const paperIdFilter = paperNum
      ? { $or: [{ paperId }, { paperId: new RegExp(`(?:tcf|paper|tef).*?${paperNum}(?:$|[^\d])`, 'i') }] }
      : { paperId };

    const queryFilter = rawUserId !== 'guest_user'
      ? { userId: String(rawUserId), ...paperIdFilter }
      : paperIdFilter;

    // Find the latest existing session for this paper
    const existing = await ActiveSession.findOne({
      ...queryFilter,
      lastUpdated: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
    }).sort({ lastUpdated: -1 });

    const clientEpoch = typeof sessionEpoch === 'number' ? sessionEpoch : 1;
    const serverEpoch = existing?.sessionEpoch || 1;

    // Reject stale ghost re-uploads if client is behind the server's reset epoch
    if (existing && clientEpoch < serverEpoch) {
      res.json({
        success: true,
        stale: true,
        sessionEpoch: serverEpoch,
        message: 'Session has been reset on another device; local state discarded.'
      });
      return;
    }

    const docId = existing?._id;

    const session = docId
      ? await ActiveSession.findByIdAndUpdate(
          docId,
          {
            userId: String(rawUserId),
            paperId: existing.paperId || paperId,
            examType: examType || existing.examType || 'TCF',
            sectionIndex: typeof sectionIndex === 'number' ? sectionIndex : existing.sectionIndex,
            questionIndex: typeof questionIndex === 'number' ? questionIndex : existing.questionIndex,
            answers: answers || existing.answers || {},
            sectionTimers: sectionTimers || existing.sectionTimers || {},
            sessionEpoch: Math.max(clientEpoch, serverEpoch),
            lastUpdated: new Date()
          },
          { new: true }
        )
      : await ActiveSession.create({
          userId: String(rawUserId),
          paperId,
          examType: examType || 'TCF',
          sectionIndex: sectionIndex ?? 0,
          questionIndex: questionIndex ?? 0,
          answers: answers || {},
          sectionTimers: sectionTimers || {},
          sessionEpoch: clientEpoch,
          lastUpdated: new Date()
        });

    res.json({ success: true, activeSession: session });
  } catch (error: any) {
    console.error('Error saving active session:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to save active session' });
  }
};

/**
 * Delete active session upon exam submission or when starting fresh
 */
export const deleteActiveSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paperId } = req.params;
    const rawUserId = (req as any).user?.userId || (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || 'guest_user';

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const paperNumberMatch = paperId.match(/\d+/);
    const paperNum = paperNumberMatch ? parseInt(paperNumberMatch[0], 10) : null;
    const paperIdFilter = paperNum
      ? { $or: [{ paperId }, { paperId: new RegExp(`(?:tcf|paper|tef).*?${paperNum}(?:$|[^\d])`, 'i') }] }
      : { paperId };

    const queryFilter = rawUserId !== 'guest_user'
      ? { userId: String(rawUserId), ...paperIdFilter }
      : paperIdFilter;

    // Find current session to advance the epoch tombstone
    const existing = await ActiveSession.findOne(queryFilter).sort({ lastUpdated: -1 });
    const nextEpoch = (existing?.sessionEpoch || 1) + 1;

    // Delete existing active sessions
    await ActiveSession.deleteMany(queryFilter);

    // Create a lightweight epoch tombstone so open tabs on other devices know to reset cleanly
    await ActiveSession.create({
      userId: String(rawUserId),
      paperId,
      examType: 'TCF',
      sectionIndex: 0,
      questionIndex: 0,
      answers: {},
      sectionTimers: {},
      sessionEpoch: nextEpoch,
      resetAt: new Date(),
      lastUpdated: new Date()
    });

    res.json({ success: true, sessionEpoch: nextEpoch, message: 'Active session reset successfully' });
  } catch (error: any) {
    console.error('Error deleting active session:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to delete active session' });
  }
};
