import { BadTokenError, BasicError } from '../../core/ApiError';
import { AllTaskInterface } from '../../interfaces/task/allTask.interface';
import { UserModel } from './user.model';

export class UserService {
  private maxLimit: number = 30;
  async fetchUserDetailsById(id: string) {
    const userDetails = await UserModel.getUserDetails(id);

    if (!userDetails) {
      throw new BasicError('Invalid User ID');
    }

    return userDetails;
  }

  async updateUserProfile(id: string, userId: string, first_name: string, last_name: string, password: string) {
    // verifying token and userid are same or not
    // so that only the id from which token is created
    // can be used to update that user profile only.
    if (id !== userId) {
      throw new BadTokenError();
    }

    await UserModel.updateUserProfile(id, first_name, last_name, password);
    return 'Profile updated successfully';
  }

  async deleteUser(id: string, userId: string) {
    if (id !== userId) {
      throw new BadTokenError();
    }

    await UserModel.deleteUser(id);
    // TODO: Need to work as we need to update other relations like
    // tasks, sessions, logs, task approvals, and more after deletion

    return 'User deleted successfully';
  }

  async fetchUserTasks(userId: string, limit: string, offset: string) {
    const resLimit = Number(limit) || this.maxLimit;
    const resOffset = Number(offset) || 0;

    if (!userId) {
      throw new BasicError('user not found');
    }

    const userTasks: AllTaskInterface[] = await UserModel.getTasks(userId, resLimit, resOffset);
    // await prisma.task.findMany({
    //   skip: resOffset,
    //   take: resLimit,
    //   where: {
    //     createdById: userId,
    //     here more condition will comes as task can be assigned
    //     by some one else inside teams, [assignedToId]
    //     assignedToId: userId,
    //   },
    //   select: {
    //     id: true,
    //     title: true,
    //     status: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     assignedToId: true,
    //     teamId: true,
    //     createdById: true,
    //     labels: true,
    //   },
    //   orderBy: {
    //     updatedAt: 'desc',
    //   },
    // });

    const totalTasksCount: Number = await UserModel.getTotalTaskCount(userId);

    const totalPages = Math.ceil(Number(totalTasksCount) / resLimit);

    // TODO: Need to Implement filters on tasks
    // like assignees, status, search text filteration
    // and more...

    if (!userTasks) {
      throw new BasicError('No task associated with this user');
    }

    return { tasks: userTasks, totalPages: totalPages };
  }
}
