import express from 'express';
import meals from './api/meals/index.js';
import orders from './api/orders/index.js';
import cart from './api/cart/index.js';
import provider from './api/provider/index.js';
import authorize from './middlewares/authorize.js';
import admin from './api/admin/index.js';
import authRole from './middlewares/authRole.js';
import review from './api/review/index.js';
import categories from './api/categories/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Root');
});
router.use('/meals', meals);
router.use('/orders', authorize, orders);
router.use('/cart', authorize, cart);
router.use('/review', authorize, review);
router.use('/providers', provider);
router.use('/admin', admin);
router.use('/categories', categories);

export default router;
