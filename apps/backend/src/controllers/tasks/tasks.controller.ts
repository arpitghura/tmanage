import express, { Router } from 'express';
import { Auth } from '../../middlewares/auth.middleware';
import Controller from '../../interfaces/controller.interface';
import { BaseController } from '../BaseController';
import sanitizeBody from '../../middlewares/sanitizeBody.middleware';
import { SuccessResponse } from '../../core/ApiResponse';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateTaskDto, UpdateTaskDto } from '../../modules/tasks/tasks.dto';
import { CreateTaskModel, UpdateTaskModel } from '../../modules/tasks/tasks.schema';
import { TaskService } from '../../modules/tasks/tasks.service';
import { ApiError } from '../../core/ApiError';

export class TasksController extends BaseController implements Controller {
  public path: string = '/tasks';
  public router: Router = express.Router();
  public auth = new Auth();
  public authMiddleware = this.auth.authMiddleware;
  private taskService = new TaskService();
  constructor() {
    super();

    this._initialiseRoutes();
  }

  private _initialiseRoutes() {
    this.router.post(`${this.path}/create`, this.authMiddleware, validationMiddleware(CreateTaskDto), this._createTask);
    this.router.get(`${this.path}/:taskId`, this.authMiddleware, this._fetchTaskDetail);
    this.router.put(`${this.path}/:taskId`, this.authMiddleware, validationMiddleware(UpdateTaskDto), this._updateTaskDetails);
  }

  private _createTask = this.catchAsyn(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    try {
      req.body = sanitizeBody(CreateTaskModel, req.body);
      const teamId = req.query.teamId as string;
      const { title, description, userId } = req.body;
      const result = await this.taskService.createTask(title, description, userId, teamId);
      return new SuccessResponse('Task created successfully', result).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _fetchTaskDetail = this.catchAsyn(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    try {
      const taskId = req.params.taskId as string;
      const result = await this.taskService.fetchTaskDetailById(taskId);

      return new SuccessResponse('Task fetched successfully', result).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _updateTaskDetails = this.catchAsyn(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    try {
      const taskId = req.params.taskId as string;
      req.body = sanitizeBody(UpdateTaskModel, req.body);
      const { title, description, status, assignee } = req.body;
      const result = await this.taskService.updateTaskDetail(taskId, title as string, description as string, status as string, assignee as string);
      return new SuccessResponse('Task updated successfully', result).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });
}
