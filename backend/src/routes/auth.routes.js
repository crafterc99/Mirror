import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, logout, me } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter,
  body('email').isEmail().normalizeEmail(),
  body('username').trim().isLength({ min: 2, max: 30 }).matches(/^[a-z0-9_-]+$/i)
    .withMessage('Username: 2–30 chars, letters/numbers/_ only'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('fullName').optional().trim().isLength({ max: 100 }),
  validate,
  register
);

router.post('/login', authLimiter,
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  validate,
  login
);

router.post('/logout', logout);

router.get('/me', requireAuth, me);

export default router;
