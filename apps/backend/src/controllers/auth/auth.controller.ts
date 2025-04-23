import express, { Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import { BaseController } from '../BaseController';

import { SigninModel, SignupModel } from '../../modules/auth/auth.schema';
import { SigninDto, SignupDto } from '../../modules/auth/auth.dto';
import { AuthService } from '../../modules/auth/auth.service';

import sanitizeBody from '../../middlewares/sanitizeBody.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { Auth } from '../../middlewares/auth.middleware';

import { ErrorResponse, SuccessResponse } from '../../core/ApiResponse';
import { getTokenFromRequest } from '../../utils/getToken';
import { ApiError } from '../../core/ApiError';

export class AuthController extends BaseController implements Controller {
  public path: string = '/auth';
  public router: Router = express.Router();
  public auth = new Auth();
  public authMiddleware = this.auth.authMiddleware;
  private authService = new AuthService();
  constructor() {
    super();

    this._initialiseRoutes();
  }

  private _initialiseRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(SignupDto), this._Signup);
    this.router.post(`${this.path}/signin`, validationMiddleware(SigninDto), this._Signin);
    this.router.get(`${this.path}/signout`, this.authMiddleware, this._SignOut);
    this.router.post(`${this.path}/reset-password`, this._resetPassword);
  }

  private _Signup = this.catchAsyn(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    try {
      req.body = sanitizeBody(SignupModel, req.body);
      const { first_name, last_name, email, password } = req.body;
      const result = await this.authService.signup(first_name, last_name, email, password);
      return new SuccessResponse('success', result).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _Signin = this.catchAsyn(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    try {
      req.body = sanitizeBody(SigninModel, req.body);
      const { email, password } = req.body;
      const result = await this.authService.signin(email, password);
      return new SuccessResponse('success', result).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _SignOut = this.catchAsyn(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    try {
      const token = getTokenFromRequest(req);

      if (!token) {
        return new ErrorResponse('Token is required').send(res);
      }

      const result = await this.authService.signout(token);
      return new SuccessResponse(result).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _resetPassword = this.catchAsyn(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.resetPassword(email, password);
      return new SuccessResponse(result).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });
}
