import express from 'express';
import { prisma } from '../../prisma.js';

const create = async (req: express.Request, res: express.Response) => {
  // Logic to create a new review
  const review = req.body;
  const UserId = req.user?.id;
  try {
    // Example: Save review to the database using Prisma
    const newReview = await prisma.review.create({
      data: { ...review, UserId },
    });
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};
const getByProvider = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  await prisma.review
    .findMany({
      where: { Meal: { providerId: id as string } },
      include: { Meal: true },
    })
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal Server Error', error });
    });
};

export { create, getByProvider };
