import { BasicError } from '../../core/ApiError';
import { TasksModel } from './tasks.model';

export class TaskService {
  async createTask(title: string, description: string, userId: string, teamId: string) {
    console.log(teamId, 'teamId');
    let isTeamExist = null;

    if (teamId && teamId === 'null') {
      // validate team Id
      //isTeamExist = await TeamModel.isTeamExist(teamId);
    }
    const finalTeamId = isTeamExist ? teamId : null;

    const result = await TasksModel.create(title, description, userId, finalTeamId);
    return result;
  }

  async fetchTaskDetailById(taskId: string) {
    const result = await TasksModel.getTaskDetail(taskId);
    return result;
  }

  async updateTaskDetail(taskId: string, title: string, description: string, status: string, assignee: string) {
    const taskDet = await TasksModel.getTaskDetail(taskId);

    if (!taskDet) {
      throw new BasicError('Task does not exists');
    }

    // TODO: Need to check whether the user have access to this task to update it or not
    // whether user belongs to same team, creator, assignee, or team admin/collaborator.

    const newTitle = (title as string) ?? taskDet.title;
    const newDesc = (description as string) ?? taskDet.description;
    const newStatus = (status as string) ?? taskDet.status;
    const newAssignees = (assignee as string) ?? taskDet.assignedToId;

    const result = await TasksModel.update(taskId, newTitle, newDesc, newStatus, newAssignees);
    return result;
  }
}
