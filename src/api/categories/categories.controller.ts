import express from 'express';
import { prisma } from '../../prisma.js';

const getAll = async (req: express.Request, res: express.Response) => {
  await prisma.category
    .findMany({
      where: {},
    })
    .then((categories) => {
      res.json(categories);
      console.log(categories);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal Server Error', error });
      console.log(error);
    });
};

const create = async (req: express.Request, res: express.Response) => {
  const category = req.body;
  console.log(req);
  try {
    const newCategory = await prisma.category.create({
      data: category,
    });

    console.log(newCategory);
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating category', error });
  }
};

const deleteOne = async (req: express.Request, res: express.Response) => {
  const categoryId = req.params.id as string;
  try {
    await prisma.category.delete({ where: { id: categoryId } });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
    console.log(error);
  }
};

export default { getAll, create, deleteOne };
