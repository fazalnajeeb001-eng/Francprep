import { Request, Response } from 'express';
import * as flashcardService from '../services/flashcard.service';

export async function reviewCards(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { reviews } = req.body;
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json({ success: false, error: 'reviews array is required' });
    }
    const result = await flashcardService.reviewCards(userId, reviews);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getDueCards(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { lessonId } = req.query;
    const cards = await flashcardService.getDueCards(userId, lessonId as string | undefined);
    res.json({ success: true, data: cards });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getAllProgress(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { lessonId } = req.query;
    const progress = await flashcardService.getAllCardProgress(userId, lessonId as string | undefined);
    res.json({ success: true, data: progress });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getStats(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const stats = await flashcardService.getCardStats(userId);
    res.json({ success: true, data: stats });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
