import express from 'express';
import { prisma } from '../../../prisma.js';

const getOne = async (req: express.Request, res: express.Response) => {
  const mealId = req.params.id as string;
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: mealId },
      include: {
        Category: true,
        provider: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { id: 'desc' },
        },
      },
    });

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    // Get related meals by category
    const relatedMeals = await prisma.meal.findMany({
      where: {
        categoryId: meal.categoryId,
        id: { not: mealId },
      },
      take: 4,
      include: { Category: true },
    });

    res.status(200).json({ ...meal, relatedMeals });
  } catch (error) {
    console.error('Error retrieving meal:', error);
    res.status(500).json({ message: 'Error retrieving meal', error });
  }
};
const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const {
      skip = '0',
      take = '10',
      category,
      search,
      type,
      sortBy,
      sortOrder,
    } = req.query;

    const skipNum = Math.max(0, parseInt(skip as string) || 0);
    const takeNum = Math.min(50, parseInt(take as string) || 10);

    // Build where clause
    const where: any = {};

    if (category && category !== 'all') {
      where.categoryId = category;
    }

    if (type && type !== 'both') {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Build order by
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy) {
      const order = sortOrder === 'desc' ? 'desc' : 'asc';
      if (sortBy === 'price') orderBy = { price: order };
      else if (sortBy === 'name') orderBy = { name: order };
    }

    const meals = await prisma.meal.findMany({
      where,
      take: takeNum,
      skip: skipNum,
      include: { Category: true },
      orderBy,
    });

    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
async function getByProvider(req: express.Request, res: express.Response) {
  const id = req.params.id;
  await prisma.meal
    .findMany({ where: { providerId: id as string } })
    .then((meals) => {
      res.json(meals);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal Server Error', error });
    });
}
export default { getOne, getAll, getByProvider };
