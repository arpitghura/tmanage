import { prisma } from '../../core/prismaClient';

export const TasksModel = {
  isTeamExist: async (teamId: string) => {
    return prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });
  },

  create: async (title: string, description: string, userId: string, teamId: string | null) => {
    return prisma.task.create({
      data: {
        title,
        description,
        createdById: userId,
        teamId: teamId,
      },
    });
  },

  update: async (taskId: string, title: string, description: string, status: string, assignedToId: string) => {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        assignedToId,
        updatedAt: new Date(),
      },
    });
  },

  delete: async (taskId: string) => {
    return prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  },

  getTaskDetail: async (taskId: string) => {
    return prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
  },
};
