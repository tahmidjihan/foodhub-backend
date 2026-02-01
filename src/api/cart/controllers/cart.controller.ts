import express from 'express';
import { prisma } from '../../../prisma.js';

const create = async (req: express.Request, res: express.Response) => {
  // Logic to create a new cart
  const cart = req.body;
  const UserId = req.user?.id;
  try {
    // Example: Save cart to the database using Prisma
    const newCart = await prisma.cart.create({ data: { ...cart, UserId } });
    res.status(201).json({ message: 'Cart created successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart', error });
  }
};
const deleteOne = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    await prisma.cart.delete({ where: { id: String(id), UserId: userId } });
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart', error });
  }
};
const getAll = async (req: express.Request, res: express.Response) => {
  const userId = req.user?.id;
  try {
    const carts = await prisma.cart.findMany({
      where: { UserId: userId },
      include: { Meal: true },
    });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving carts', error });
  }
};
const getOne = async (req: express.Request, res: express.Response) => {
  const cartId = req.params.id as string;
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { Meal: true },
    });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error });
  }
};
export default { create, deleteOne, getAll, getOne };
