import express from 'express';
import controller from './controllers/cart.controller.js';
const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.delete('/:id', controller.deleteOne);

export default router;
