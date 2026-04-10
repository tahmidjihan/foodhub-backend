import express from 'express';
import { prisma } from '../../../prisma.js';

// GET /api/dashboard/stats - Overview statistics
const getStats = async (req: express.Request, res: express.Response) => {
  try {
    const [
      totalOrders,
      completedOrders,
      pendingOrders,
      inProgressOrders,
      cancelledOrders,
      totalMeals,
      totalProviders,
      totalCustomers,
      revenueData,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'Completed' } }),
      prisma.order.count({ where: { status: 'Pending' } }),
      prisma.order.count({ where: { status: 'InProgress' } }),
      prisma.order.count({ where: { status: 'Cancelled' } }),
      prisma.meal.count(),
      prisma.user.count({ where: { role: 'Provider' } }),
      prisma.user.count({ where: { role: 'Customer' } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: 'Completed' },
      }),
    ]);

    res.json({
      totalOrders,
      totalSpending: revenueData._sum.total || 0,
      activeOrders: pendingOrders + inProgressOrders,
      completedOrders,
      cancelledOrders,
      pendingOrders,
      inProgressOrders,
      totalMeals,
      totalProviders,
      totalCustomers,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error retrieving dashboard stats', error });
  }
};

// GET /api/dashboard/chart-data - Time series data for charts
const getChartData = async (req: express.Request, res: express.Response) => {
  try {
    const { days = '30' } = req.query;
    const daysNum = parseInt(days as string);

    // Get orders for the past N days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        createdAt: true,
        total: true,
      },
    });

    // Group by date
    const dateMap = new Map<string, { orders: number; revenue: number }>();

    // Initialize all dates
    for (let i = 0; i < daysNum; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (daysNum - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      dateMap.set(dateStr, { orders: 0, revenue: 0 });
    }

    // Fill in actual data
    orders.forEach((order) => {
      const dateStr = order.createdAt.toISOString().split('T')[0];
      const existing = dateMap.get(dateStr);
      if (existing) {
        existing.orders += 1;
        existing.revenue += order.total;
      }
    });

    const chartData = Array.from(dateMap.entries()).map(([date, data]) => ({
      date,
      orders: data.orders,
      revenue: Math.round(data.revenue * 100) / 100,
    }));

    res.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ message: 'Error retrieving chart data', error });
  }
};

// GET /api/dashboard/status-distribution - Order status breakdown
const getStatusDistribution = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const [pending, inProgress, completed, cancelled] = await Promise.all([
      prisma.order.count({ where: { status: 'Pending' } }),
      prisma.order.count({ where: { status: 'InProgress' } }),
      prisma.order.count({ where: { status: 'Completed' } }),
      prisma.order.count({ where: { status: 'Cancelled' } }),
    ]);

    res.json([
      { name: 'Pending', value: pending, color: '#fbbf24' },
      { name: 'In Progress', value: inProgress, color: '#60a5fa' },
      { name: 'Completed', value: completed, color: '#008148' },
      { name: 'Cancelled', value: cancelled, color: '#ef4444' },
    ]);
  } catch (error) {
    console.error('Error fetching status distribution:', error);
    res
      .status(500)
      .json({ message: 'Error retrieving status distribution', error });
  }
};

// GET /api/dashboard/recent-orders - Recent orders for table
const getRecentOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { limit = '5' } = req.query;
    const limitNum = Math.min(parseInt(limit as string), 20);

    const orders = await prisma.order.findMany({
      take: limitNum,
      orderBy: { createdAt: 'desc' },
      include: {
        Meal: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    res.status(500).json({ message: 'Error retrieving recent orders', error });
  }
};

export default {
  getStats,
  getChartData,
  getStatusDistribution,
  getRecentOrders,
};
