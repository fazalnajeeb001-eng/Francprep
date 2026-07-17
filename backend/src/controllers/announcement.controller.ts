import { Request, Response } from 'express';
import Announcement from '../models/Announcement';

export async function getAnnouncements(req: Request, res: Response) {
  try {
    const { page = 1, limit = 20, type, isActive } = req.query;
    const filter: any = {};
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const [announcements, total] = await Promise.all([
      Announcement.find(filter)
        .sort({ priority: -1, createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .populate('createdBy', 'firstName lastName email')
        .lean(),
      Announcement.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: announcements,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getActiveAnnouncements(_req: Request, res: Response) {
  try {
    const now = new Date();
    const announcements = await Announcement.find({
      isActive: true,
      $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: now } }],
    })
      .sort({ priority: -1, createdAt: -1 })
      .limit(10)
      .lean();
    res.json({ success: true, data: announcements });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createAnnouncement(req: Request, res: Response) {
  try {
    const { title, content, type, priority, isActive, expiresAt } = req.body;
    if (!title || !content || !type) {
      return res.status(400).json({ success: false, error: 'Title, content, and type are required' });
    }
    const announcement = await Announcement.create({
      title, content, type,
      priority: priority || 'medium',
      isActive: isActive !== undefined ? isActive : true,
      expiresAt: expiresAt || undefined,
      createdBy: (req as any).user._id,
    });
    res.status(201).json({ success: true, data: announcement });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateAnnouncement(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const announcement = await Announcement.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!announcement) return res.status(404).json({ success: false, error: 'Announcement not found' });
    res.json({ success: true, data: announcement });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function deleteAnnouncement(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) return res.status(404).json({ success: false, error: 'Announcement not found' });
    res.json({ success: true, data: { id } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
