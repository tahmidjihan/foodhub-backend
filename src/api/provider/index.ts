import express from 'express';
import controller from './controller/provider.controller.js';
import orders from './orders/index.js';
import meals from './meals/index.js';
import authRole from '../../middlewares/authRole.js';
import authorize from '../../middlewares/authorize.js';
const router = express.Router();

router.get('/:id', controller.getOne);
router.get('/', controller.getAll);

router.get('/orders', authorize, authRole(['Provider']), orders.getAll);

router.patch(
  '/orders/:id',
  authorize,
  authRole(['Provider']),
  orders.patchOrder,
);

router.use('/meals', authorize, meals);

router.post('/', controller.createOne);

export default router;
