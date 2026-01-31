import express from 'express';
import { prisma } from '../../../prisma.js';

type OrderStatus = 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';

function patchOrder(req: express.Request, res: express.Response) {
  const orderId = req.params.id as string;
  const status = req.body.status as OrderStatus;

  const result = prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  result
    .then((order) => {
      res
        .status(200)
        .json({ message: 'Order status updated successfully', order });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error updating order status', error });
    });
}

function getAll(req: express.Request, res: express.Response) {
  const providerId = req.user?.id;
  console.log('Orders getAll - req.user?.id:', req.user?.id);
  if (!providerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const skipPage = Math.max(1, parseInt(req.query.skip as string) || 1); // 1-based page number
  const take = Math.min(50, parseInt(req.query.take as string) || 10);
  const skip = (skipPage - 1) * take; // Convert page to 0-based offset

  prisma.order
    .findMany({
      where: { Meal: { providerId } },
      include: { Meal: true, User: { select: { id: true, name: true, email: true } } }, // Include User for customer info
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })
    .then((orders) => {
      res.json(orders);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal Server Error', error });
    });
}

export default { patchOrder, getAll };
