import express from 'express';
import meals from './api/meals/index.js';
import orders from './api/orders/index.js';
import cart from './api/cart/index.js';
import provider from './api/provider/index.js';
import authorize from './middlewares/authorize.js';
import admin from './api/admin/index.js';
import authRole from './middlewares/authRole.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Root');
});
router.use('/meals', meals);
router.use('/orders', orders);
router.use('/cart', authorize, cart);
router.use('/providers', authorize, authRole(['admin']), provider);
router.use('/admin', authorize, authRole(['admin']), admin);

export default router;
