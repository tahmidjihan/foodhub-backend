import express from 'express';
import { prisma } from '../../../prisma.js';

const getOne = async (req: express.Request, res: express.Response) => {
  const mealId = req.params.id as string;
  try {
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (meal) {
      res.status(200).json(meal);
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meal', error });
  }
};
const getAll = (req: express.Request, res: express.Response) => {
  type pagination = {
    skip: string;
    take: string;
  };
  const pagination = req.query.pagination as pagination;
  if (!pagination || !pagination.skip || !pagination.take) {
    pagination.skip = '1';
    pagination.take = '10';
    return;
  }
  const providerId = req.user?.id;
  prisma.meal
    .findMany({
      where: { providerId },
      take: Number(pagination.take),
      skip: (Number(pagination.skip) - 1) * 10,
    })
    .then((meals) => {
      res.json(meals);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal Server Error', error });
    });
};
export default { getOne, getAll };
