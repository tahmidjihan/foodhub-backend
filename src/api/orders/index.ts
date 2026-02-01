import express from 'express';
import controller from './controllers/orders.controller.js';
import authorize from '../../middlewares/authorize.js'; // Import authorize middleware

const router = express.Router();

router.post('/', controller.create);
router.get('/', authorize, controller.getUserOrders);
router.get('/provider/:id', authorize, controller.getProviderOrders);

export default router;
