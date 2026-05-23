import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { create, list, getOne } from '../controllers/journal.controller.js';

const router = Router();

router.use(requireAuth);

router.post('/',
  body('type').optional().isIn(['text', 'voice']),
  body('content').optional().isString().isLength({ max: 50000 }),
  body('transcript').optional().isString().isLength({ max: 50000 }),
  body('moodTags').optional().isArray(),
  body('emotionalIntensity').optional().isInt({ min: 1, max: 10 }),
  validate,
  create
);

router.get('/', list);
router.get('/:id', getOne);

export default router;
