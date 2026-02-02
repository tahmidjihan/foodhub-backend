import express from 'express';
import { prisma } from '../../prisma.js';

function getUsers(req: express.Request, res: express.Response) {
  prisma.user
    .findMany({})
    .then((users) => {
      // console.log(users);
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving users', error });
    });
}
const deleteUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: String(id) } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
const updateUser = async (req: express.Request, res: express.Response) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: String(userId) },
      data: updatedData,
    });
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};
const getAllOrders = async (req: express.Request, res: express.Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};

export default { getUsers, deleteUser, updateUser, getAllOrders };
