import express from 'express';
import { prisma } from '../../../prisma.js';

const getOne = async (req: express.Request, res: express.Response) => {
  const providerId = req.params.id as string;
  try {
    const provider = await prisma.user.findUnique({
      where: { id: providerId, role: 'Provider' },
      include: { meals: true },
    });
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving provider', error });
  }
};
const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const providers = await prisma.user.findMany({
      where: { role: 'Provider' },
    });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving providers', error });
  }
};
const createOne = async (req: express.Request, res: express.Response) => {
  const data = req.body;
  try {
    const provider = await prisma.providerProfile.create({ data });
    res.status(201).json(provider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating provider', error });
  }
};

export default { getOne, getAll, createOne };
