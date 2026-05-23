import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { fetchProfile, patchProfile } from '../controllers/user.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/profile', fetchProfile);
router.patch('/profile', patchProfile);

export default router;
