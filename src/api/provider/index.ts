import express from 'express';
import controller from './controller/provider.controller.js';
import orders from './orders/index.js';
import meals from './meals/index.js';
const router = express.Router();

router.get('/:id', controller.getOne);
router.get('/', controller.getAll);

router.get('/orders/:id', orders);

router.use('/meals', meals);
export default router;
