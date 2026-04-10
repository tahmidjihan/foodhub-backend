import express from 'express';
import controller from './controllers/cart.controller.js';
import authorize from '../../middlewares/authorize.js';

const router = express.Router();

// All cart routes require authentication
router.use(authorize);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.delete('/:id', controller.deleteOne);
router.get('/:id', controller.getOne);

export default router;
