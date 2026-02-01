import express from 'express';
import controller from './admin.controller.js';
const router = express.Router();

router.get('/users', controller.getUsers);
router.delete('/users/:id', controller.deleteUser);
router.put('/users/:id', controller.updateUser);
router.get('/orders', controller.getAllOrders);

export default router;
