import { prisma } from '../../core/prismaClient';
import { hashPassword } from '../../utils/hashing';

export const UserModel = {
  getUserDetails: async (id: string) => {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        updatedAt: true,
        role: true,
      },
    });
  },

  updateUserProfile: async (id: string, first_name: string, last_name: string, password: string) => {
    if (first_name && first_name !== '') {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          first_name: first_name,
        },
      });
    }

    if (last_name && last_name !== '') {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          last_name: last_name,
        },
      });
    }

    if (password && password !== '') {
      const hashedPassword = await hashPassword(password);

      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: hashedPassword,
        },
      });
    }
  },

  deleteUser: async (id: string) => {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  },

  getTasks: async (userId: string, limit: number, offset: number) => {
    return prisma.task.findMany({
      skip: offset,
      take: limit,
      where: {
        createdById: userId,
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        assignedToId: true,
        teamId: true,
        createdById: true,
        labels: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  },

  getTotalTaskCount: async (userId: string) => {
    return prisma.task.count({
      where: {
        createdById: userId,
      },
    });
  },
};
