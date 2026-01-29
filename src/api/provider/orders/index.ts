import express from 'express';
import { prisma } from '../../../prisma.js';
type OrderStatus = 'pending' | 'InProgress' | 'completed' | 'cancelled';
export default function patchOrder(
  req: express.Request,
  res: express.Response,
) {
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
