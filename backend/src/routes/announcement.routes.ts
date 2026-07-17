import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as announcementController from '../controllers/announcement.controller';

const router = Router();

router.get('/', authenticate, authorize('admin'), announcementController.getAnnouncements);
router.get('/active', announcementController.getActiveAnnouncements);
router.post('/', authenticate, authorize('admin'), announcementController.createAnnouncement);
router.put('/:id', authenticate, authorize('admin'), announcementController.updateAnnouncement);
router.delete('/:id', authenticate, authorize('admin'), announcementController.deleteAnnouncement);

export default router;
