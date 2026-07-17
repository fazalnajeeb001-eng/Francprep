import { Router, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { AuthRequest } from '../types';
import Draft from '../models/Draft';

const router = Router();

router.get('/content-pipeline/drafts', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const drafts = await Draft.find({ status: { $ne: 'imported' } }).sort({ updatedAt: -1 });
    res.json({ success: true, data: drafts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/content-pipeline/drafts/:id', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    await Draft.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Draft deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
