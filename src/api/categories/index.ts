import express from 'express';
import controller from './categories.controller.js';

const router = express.Router();
router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:id', controller.deleteOne);

export default router;
