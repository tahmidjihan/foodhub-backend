import express from 'express';
import controller from './categories.controller.js';
import authorize from '../../middlewares/authorize.js';
import authRole from '../../middlewares/authRole.js';

const router = express.Router();

// Public route - anyone can view categories
router.get('/', controller.getAll);

// Protected routes - only Admin can create or delete categories
router.post('/', authorize, authRole('Admin'), controller.create);
router.delete('/:id', authorize, authRole('Admin'), controller.deleteOne);

export default router;
