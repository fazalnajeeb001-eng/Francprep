import { Router } from 'express';
import { getActiveSession, saveActiveSession, deleteActiveSession } from '../controllers/activeSession.controller';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.use(optionalAuth);

router.get('/:paperId', getActiveSession);
router.post('/', saveActiveSession);
router.delete('/:paperId', deleteActiveSession);

export default router;
