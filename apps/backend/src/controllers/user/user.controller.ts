import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import { Auth } from '../../middlewares/auth.middleware';
import { BaseController } from '../BaseController';
import { SuccessResponse } from '../../core/ApiResponse';
import sanitizeBody from '../../middlewares/sanitizeBody.middleware';
import { UserSchema } from '../../modules/user/user.schema';
import validationMiddleware from '../../middlewares/validation.middleware';
import { UserDto } from '../../modules/user/user.dto';
import { ApiError } from '../../core/ApiError';
import { UserService } from '../../modules/user/user.service';

export class UserController extends BaseController implements Controller {
  public path: string = '/users';
  public router: Router = express.Router();
  public auth = new Auth();
  public authMiddleware = this.auth.authMiddleware;
  private userService = new UserService();

  constructor() {
    super();

    this._initialiseRoutes();
  }

  private _initialiseRoutes() {
    this.router.get(`${this.path}/:id`, this.authMiddleware, this._fetchUserProfile);
    this.router.put(`${this.path}/:id`, this.authMiddleware, validationMiddleware(UserDto), this._updateUserProfile);
    this.router.delete(`${this.path}/:id`, this.authMiddleware, this._deleteUser);
    this.router.get(`${this.path}/:userId/tasks`, this.authMiddleware, this._fetchUserTasks);
  }

  private _fetchUserProfile = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { id } = req.params;
      const userDetails = await this.userService.fetchUserDetailsById(id);
      return new SuccessResponse('User details fetched', userDetails).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _updateUserProfile = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    try {
      req.body = sanitizeBody(UserSchema, req.body);
      const { id } = req.params;
      const { first_name, last_name, password, userId } = req.body;

      const updatedUser = await this.userService.updateUserProfile(id, userId, first_name, last_name, password);
      return new SuccessResponse(updatedUser).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _deleteUser = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      const deletedUser = await this.userService.deleteUser(id, userId);
      return new SuccessResponse(deletedUser).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _fetchUserTasks = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query;

      const userTasks = await this.userService.fetchUserTasks(userId as string, limit as string, offset as string);
      return new SuccessResponse('Tasks fetched successfully', userTasks).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });
}
