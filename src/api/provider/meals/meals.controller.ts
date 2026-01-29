import express from 'express';
import { prisma } from '../../../prisma.js';
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
const create = async (req: express.Request, res: express.Response) => {
  // Logic to create a new meal
  const meal = req.body;
  const providerId = await req.user?.id;
  try {
    // Example: Save meal to the database using Prisma
    const newMeal = await prisma.meal.create({
      data: { ...meal, providerId: providerId },
    });

    console.log(newMeal);
    res.status(201).json({ message: 'Meal created successfully', meal });
  } catch (error) {
    res.status(500).json({ message: 'Error creating meal', error });
  }
};
const updateOne = async (req: express.Request, res: express.Response) => {
  const mealId = req.params.id as string;
  const providerId = req.user?.id;
  const updatedData = req.body;
  try {
    const updatedMeal = await prisma.meal.update({
      where: { id: mealId, providerId },
      data: updatedData,
    });
    res
      .status(200)
      .json({ message: 'Meal updated successfully', meal: updatedMeal });
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal', error });
  }
};
const deleteOne = async (req: express.Request, res: express.Response) => {
  const mealId = req.params.id as string;
  try {
    await prisma.meal.delete({ where: { id: mealId } });
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal', error });
  }
};
export default { getAll, create, getOne, updateOne, deleteOne };
