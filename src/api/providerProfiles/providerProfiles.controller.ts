import express from 'express';
import { prisma } from '../../prisma.js';

const getOne = async (req: express.Request, res: express.Response) => {
  const providerProfileId = req.params.id as string;
  try {
    const providerProfile = await prisma.providerProfile.findUnique({ where: { id: providerProfileId } });
    if (providerProfile) {
      res.status(200).json(providerProfile);
    } else {
      res.status(404).json({ message: 'ProviderProfile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving providerProfile', error });
    console.log(error);
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

  await prisma.providerProfile
    .findMany({
      where: {},
      take: parseInt(pagination.take),
      skip: parseInt(pagination.skip),
    })
    .then((providerProfiles) => {
      res.json(providerProfiles);
      console.log(providerProfiles);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal Server Error', error });
      console.log(error);
    });
};

const create = async (req: express.Request, res: express.Response) => {
  const providerProfile = req.body;
  try {
    const newProviderProfile = await prisma.providerProfile.create({
      data: providerProfile,
    });

    console.log(newProviderProfile);
    res.status(201).json({ message: 'ProviderProfile created successfully', providerProfile: newProviderProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating providerProfile', error });
  }
};

const updateOne = async (req: express.Request, res: express.Response) => {
  const providerProfileId = req.params.id as string;
  const updatedData = req.body;
  try {
    const updatedProviderProfile = await prisma.providerProfile.update({
      where: { id: providerProfileId },
      data: updatedData,
    });
    res
      .status(200)
      .json({ message: 'ProviderProfile updated successfully', providerProfile: updatedProviderProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error updating providerProfile', error });
    console.log(error);
  }
};

const deleteOne = async (req: express.Request, res: express.Response) => {
  const providerProfileId = req.params.id as string;
  try {
    await prisma.providerProfile.delete({ where: { id: providerProfileId } });
    res.status(200).json({ message: 'ProviderProfile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting providerProfile', error });
    console.log(error);
  }
};

export default { getOne, getAll, create, updateOne, deleteOne };
