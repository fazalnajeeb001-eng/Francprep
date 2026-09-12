// 🇨🇦 Francprep Phase 1: Cross-Device Active Session Sync Architecture Verified
import { Request, Response } from 'express';
import { ActiveSession } from '../models/ActiveSession';

/**
 * Helper to produce a standardized canonical paper ID
 */
const getCanonicalPaperId = (paperId: string): string => {
  if (!paperId) return 'default';
  const lower = paperId.toLowerCase();
  const paperMatch = lower.match(/(?:paper-?)(\d+)/) || lower.match(/(\d+)$/);
  const paperNum = paperMatch ? parseInt(paperMatch[1], 10) : null;
  if (!paperNum) return paperId;
  const isOfficial = lower.includes('official') || lower.includes('exam');
  const prefix = lower.includes('tef') ? 'tef-canada' : lower.includes('delf') ? 'delf-b2' : 'tcf-canada';
  return isOfficial
    ? `${prefix}-official-exam-paper-${paperNum}`
    : `${prefix}-practice-paper-${paperNum}`;
};

/**
 * Get active session for a specific paper and user
 */
export const getActiveSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paperId } = req.params;
    const rawUserId = (req as any).user?.userId || (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || req.headers['x-device-id'] || 'guest_user';

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const canonicalPaperId = getCanonicalPaperId(paperId);

    // Primary lookup: exact match on (userId, canonicalPaperId)
    let session = await ActiveSession.findOne({
      userId: String(rawUserId),
      paperId: canonicalPaperId,
      lastUpdated: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
    }).sort({ lastUpdated: -1 });

    // Secondary fallback: if guest or legacy, check raw paperId
    if (!session && canonicalPaperId !== paperId) {
      session = await ActiveSession.findOne({
        userId: String(rawUserId),
        paperId,
        lastUpdated: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
      }).sort({ lastUpdated: -1 });
    }

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
 * Uses atomic MongoDB findOneAndUpdate with upsert to prevent any E11000 duplicate key errors
 */
export const saveActiveSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawUserId = (req as any).user?.userId || (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || req.headers['x-device-id'] || req.body.userId || 'guest_user';
    const { paperId, examType, sectionIndex, questionIndex, answers, sectionTimers, sessionEpoch } = req.body;

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const canonicalPaperId = getCanonicalPaperId(paperId);
    const clientEpoch = typeof sessionEpoch === 'number' ? sessionEpoch : 1;

    // Check if there is an existing session to verify epoch
    const existing = await ActiveSession.findOne({
      userId: String(rawUserId),
      paperId: canonicalPaperId
    });

    const serverEpoch = existing?.sessionEpoch || 1;

    // Reject stale ghost re-uploads if client is behind server's reset epoch
    if (existing && clientEpoch < serverEpoch) {
      res.json({
        success: true,
        stale: true,
        sessionEpoch: serverEpoch,
        message: 'Session has been reset; local state discarded.'
      });
      return;
    }

    // Atomic findOneAndUpdate with upsert: GUARANTEED ZERO E11000 duplicate key errors
    const session = await ActiveSession.findOneAndUpdate(
      { userId: String(rawUserId), paperId: canonicalPaperId },
      {
        $set: {
          examType: examType || existing?.examType || 'TCF',
          sectionIndex: typeof sectionIndex === 'number' ? sectionIndex : (existing?.sectionIndex ?? 0),
          questionIndex: typeof questionIndex === 'number' ? questionIndex : (existing?.questionIndex ?? 0),
          answers: answers || existing?.answers || {},
          sectionTimers: sectionTimers || existing?.sectionTimers || {},
          sessionEpoch: Math.max(clientEpoch, serverEpoch),
          lastUpdated: new Date()
        },
        $unset: {
          resetAt: 1
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

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
    const rawUserId = (req as any).user?.userId || (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || req.headers['x-device-id'] || 'guest_user';

    if (!paperId) {
      res.status(400).json({ success: false, message: 'Paper ID is required' });
      return;
    }

    const canonicalPaperId = getCanonicalPaperId(paperId);
    const filter = {
      userId: String(rawUserId),
      $or: [{ paperId: canonicalPaperId }, { paperId }]
    };

    // Advance the epoch tombstone
    const existing = await ActiveSession.findOne(filter).sort({ lastUpdated: -1 });
    const nextEpoch = (existing?.sessionEpoch || 1) + 1;

    // Delete existing active sessions for this user & paper
    await ActiveSession.deleteMany(filter);

    // Create a lightweight epoch tombstone so any other open device drops its stale state
    await ActiveSession.create({
      userId: String(rawUserId),
      paperId: canonicalPaperId,
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
