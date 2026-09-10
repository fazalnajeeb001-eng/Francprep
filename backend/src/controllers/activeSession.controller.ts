import { Request, Response } from 'express';
import { ActiveSession } from '../models/ActiveSession';

/**
 * Get active session for a specific paper and user
 */
export const getActiveSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paperId } = req.params;

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const paperNumberMatch = paperId.match(/\d+/);
    const paperNum = paperNumberMatch ? parseInt(paperNumberMatch[0], 10) : null;
    const paperIdFilter = paperNum
      ? { $or: [{ paperId }, { paperId: new RegExp(`(?:tcf|paper|tef).*?${paperNum}(?:$|[^\d])`, 'i') }] }
      : { paperId };

    // Fetch the absolute newest active session across all devices for this paper in the last 24h
    const session = await ActiveSession.findOne({
      ...paperIdFilter,
      lastUpdated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
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
    const rawUserId = (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || req.headers['x-device-id'] || req.body.userId || 'guest_user';
    const { paperId, examType, sectionIndex, questionIndex, answers, sectionTimers } = req.body;

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const paperNumberMatch = paperId.match(/\d+/);
    const paperNum = paperNumberMatch ? parseInt(paperNumberMatch[0], 10) : null;
    const paperIdFilter = paperNum
      ? { $or: [{ paperId }, { paperId: new RegExp(`(?:tcf|paper|tef).*?${paperNum}(?:$|[^\d])`, 'i') }] }
      : { paperId };

    // Find the latest existing session for this paper
    const existing = await ActiveSession.findOne({
      ...paperIdFilter,
      lastUpdated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }).sort({ lastUpdated: -1 });

    const incomingAnswerCount = answers?.selectedAnswers ? Object.keys(answers.selectedAnswers).length : 0;
    const existingAnswerCount = existing?.answers?.selectedAnswers ? Object.keys(existing.answers.selectedAnswers).length : 0;

    // Merge answers to guarantee no progress is ever wiped out
    let mergedAnswers = { ...(existing?.answers || {}), ...(answers || {}) };
    if (existing?.answers?.selectedAnswers && answers?.selectedAnswers) {
      mergedAnswers.selectedAnswers = { ...existing.answers.selectedAnswers, ...answers.selectedAnswers };
    }

    // Pick highest question position reached
    const targetQIndex = (questionIndex === 0 && (existing?.questionIndex ?? 0) > 0 && incomingAnswerCount <= existingAnswerCount)
      ? existing!.questionIndex
      : (questionIndex ?? 0);

    const targetSectionIndex = (sectionIndex === 0 && (existing?.sectionIndex ?? 0) > 0 && incomingAnswerCount <= existingAnswerCount)
      ? existing!.sectionIndex
      : (sectionIndex ?? 0);

    const docId = existing?._id;

    const session = docId
      ? await ActiveSession.findByIdAndUpdate(
          docId,
          {
            userId: String(rawUserId),
            paperId: existing.paperId || paperId,
            examType: examType || existing.examType || 'TCF',
            sectionIndex: targetSectionIndex,
            questionIndex: targetQIndex,
            answers: mergedAnswers,
            sectionTimers: sectionTimers || existing.sectionTimers || {},
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

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const paperNumberMatch = paperId.match(/\d+/);
    const paperNum = paperNumberMatch ? parseInt(paperNumberMatch[0], 10) : null;
    const paperIdFilter = paperNum
      ? { $or: [{ paperId }, { paperId: new RegExp(`(?:tcf|paper|tef).*?${paperNum}(?:$|[^\d])`, 'i') }] }
      : { paperId };

    await ActiveSession.deleteMany(paperIdFilter);

    res.json({ success: true, message: 'Active session cleared successfully' });
  } catch (error: any) {
    console.error('Error deleting active session:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to delete active session' });
  }
};
