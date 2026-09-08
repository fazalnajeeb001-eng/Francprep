import { Request, Response } from 'express';
import { ActiveSession } from '../models/ActiveSession';

/**
 * Get active session for a specific paper and user
 */
export const getActiveSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'];
    const { paperId } = req.params;

    if (!userId || !paperId) {
      res.status(400).json({ success: false, message: 'User ID and Paper ID are required' });
      return;
    }

    const session = await ActiveSession.findOne({ userId: String(userId), paperId });

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
    const userId = (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || req.body.userId;
    const { paperId, examType, sectionIndex, questionIndex, answers, sectionTimers } = req.body;

    if (!userId || !paperId) {
      res.status(400).json({ success: false, message: 'User ID and Paper ID are required' });
      return;
    }

    const session = await ActiveSession.findOneAndUpdate(
      { userId: String(userId), paperId },
      {
        userId: String(userId),
        paperId,
        examType: examType || 'TCF',
        sectionIndex: sectionIndex ?? 0,
        questionIndex: questionIndex ?? 0,
        answers: answers || {},
        sectionTimers: sectionTimers || {},
        lastUpdated: new Date()
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
    const userId = (req as any).user?.id || (req as any).user?._id || req.headers['x-user-id'] || req.body.userId;
    const { paperId } = req.params;

    if (!userId || !paperId) {
      res.status(400).json({ success: false, message: 'User ID and Paper ID are required' });
      return;
    }

    await ActiveSession.deleteOne({ userId: String(userId), paperId });

    res.json({ success: true, message: 'Active session cleared successfully' });
  } catch (error: any) {
    console.error('Error deleting active session:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to delete active session' });
  }
};
