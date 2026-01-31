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
const getAll = async (req: express.Request, res: express.Response) => {
  type pagination = {
    skip: string;
    take: string;
  };
  const pagination = {
    skip: req.query.skip as string,
    take: req.query.take as string,
  };
  if (!pagination) {
    res.status(400).json({ message: 'Pagination parameters are required' });
    return;
  }

  await prisma.meal
    .findMany({
      where: {},
      take: parseInt(pagination.take),
      skip: parseInt(pagination.skip),
    })
    .then((meals) => {
      res.json(meals);
      console.log(meals);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal Server Error', error });
      console.log(error);
    });
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
