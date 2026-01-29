import express from 'express';
import { prisma } from '../../../prisma.js';

const create = async (req: express.Request, res: express.Response) => {
  // Logic to create a new order
  const order = req.body;
  try {
    const newOrder = await prisma.order.create({ data: order });
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};
const getOne = async (req: express.Request, res: express.Response) => {
  const orderId = req.params.id as string;
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
};
const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};
export default { create, getOne, getAll };
