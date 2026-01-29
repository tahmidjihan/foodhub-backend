import express from 'express';
import { prisma } from '../../../prisma.js';

const create = async (req: express.Request, res: express.Response) => {
  // Logic to create a new cart
  const cart = req.body;
  try {
    // Example: Save cart to the database using Prisma
    const newCart = await prisma.cart.create({ data: cart });
    res.status(201).json({ message: 'Cart created successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart', error });
  }
};
const deleteOne = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    await prisma.cart.delete({ where: { id: String(id) } });
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart', error });
  }
};
const getAll = async (req: express.Request, res: express.Response) => {
  const userId = req.user?.id;
  try {
    const carts = await prisma.cart.findMany({ where: { UserId: userId } });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving carts', error });
  }
};
export default { create, deleteOne, getAll };
