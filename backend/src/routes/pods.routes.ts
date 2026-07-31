import { Router } from 'express';
import { StudyPod } from '../models/StudyPod';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET active pods for current user
router.get('/', authenticate, async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const pods = await StudyPod.find({ 'members.userId': userId }).sort({ updatedAt: -1 });
    res.json({ success: true, data: pods });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch study pods' });
  }
});

// POST message or audio voice note to a Pod
router.post('/:id/messages', authenticate, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { text, audioSnippet } = req.body;
    const userId = req.user.id;
    const userName = req.user.firstName || 'Candidate';

    const pod = await StudyPod.findById(id);
    if (!pod) return res.status(404).json({ success: false, error: 'Pod not found' });

    const isMember = pod.members.some((m: any) => m.userId === userId);
    if (!isMember) return res.status(403).json({ success: false, error: 'Not a member of this Pod' });

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: userId,
      senderName: userName,
      text: text || '',
      audioSnippet: audioSnippet || undefined,
      createdAt: new Date(),
    };

    pod.messages.push(newMessage as any);
    pod.updatedAt = new Date();
    await pod.save();

    res.json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to post message to Pod' });
  }
});

export default router;
