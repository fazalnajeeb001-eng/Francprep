import { Router } from 'express';
import { getActiveSession, saveActiveSession, deleteActiveSession } from '../controllers/activeSession.controller';

const router = Router();

router.get('/:paperId', getActiveSession);
router.post('/', saveActiveSession);
router.delete('/:paperId', deleteActiveSession);

export default router;
