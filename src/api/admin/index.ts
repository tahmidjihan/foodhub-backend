import express from 'express';
import controller from './admin.controller.js';
const router = express.Router();

router.get('/', controller.getUsers);
router.delete('/:id', controller.deleteUser);
router.put('/:id', controller.updateUser);

export default router;
