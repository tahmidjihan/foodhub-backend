import express from 'express';
import controller from './admin.controller.js';
import authorize from '../../middlewares/authorize.js';
import authRole from '../../middlewares/authRole.js';

const router = express.Router();

// All admin routes require authentication and Admin role
router.use(authorize, authRole('Admin'));

router.get('/users', controller.getUsers);
router.delete('/users/:id', controller.deleteUser);
router.put('/users/:id', controller.updateUser);
router.get('/orders', controller.getAllOrders);

export default router;
