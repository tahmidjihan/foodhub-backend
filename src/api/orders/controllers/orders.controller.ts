import express from 'express';
import { prisma } from '../../../prisma.js';

const create = async (req: express.Request, res: express.Response) => {
  // Logic to create a new order
  const order = req.body;
  const UserId = req.user?.id;
  try {
    const newOrder = await prisma.order.create({ data: { ...order, UserId } });
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// New function to get orders for a specific provider
const getProviderOrders = async (
  req: express.Request,
  res: express.Response,
) => {
  const providerId = req.params.id as string; // Get provider ID from URL params

  try {
    const orders = await prisma.order.findMany({
      where: {
        Meal: {
          providerId: providerId, // Filter orders by meal's providerId
        },
      },
      include: {
        Meal: true, // Include meal details
        User: { select: { id: true, name: true, email: true } }, // Include customer details
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching provider orders:', error);
    res.status(500).json({ message: 'Error fetching provider orders', error });
  }
};
const getUserOrders = async (req: express.Request, res: express.Response) => {
  const userId = req.user?.id;
  try {
    const orders = await prisma.order.findMany({
      where: { UserId: userId },
      include: { Meal: true },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};
export default { create, getProviderOrders, getUserOrders };
