import express from 'express';
import controller from './controllers/dashboard.controller.js';

const router = express.Router();

router.get('/stats', controller.getStats);
router.get('/chart-data', controller.getChartData);
router.get('/status-distribution', controller.getStatusDistribution);
router.get('/recent-orders', controller.getRecentOrders);

export default router;
