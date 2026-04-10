import express from 'express';
import controller from './meals.controller.js';
import authorize from '../../../middlewares/authorize.js';
import authRole from '../../../middlewares/authRole.js';

const router = express.Router();

// Create meal (Provider only)
router.post('/', authorize, authRole(['Provider']), controller.create);

// Get all meals for the authenticated provider
router.get('/', authorize, authRole(['Provider']), controller.getAll);

// Get, update, delete specific meal
router.get('/:id', controller.getOne);
router.put('/:id', authorize, authRole(['Provider']), controller.updateOne);
router.delete('/:id', authorize, authRole(['Provider']), controller.deleteOne);

export default router;
