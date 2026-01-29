import express from 'express';
import { prisma } from '../../prisma.js';

function getUsers(req: express.Request, res: express.Response) {
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
  prisma.user
    .findMany({
      take: Number(pagination.take),
      skip: (Number(pagination.skip) - 1) * 10,
    })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving users', error });
    });
}
const deleteUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: String(id) } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
const updateUser = async (req: express.Request, res: express.Response) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: String(userId) },
      data: updatedData,
    });
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export default { getUsers, deleteUser, updateUser };
