import express from 'express';
import { ApiError, ForbiddenError } from '../core/ApiError';

export const authoriseRoles = (roles: string[]) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!roles.includes(req.body.tokenRole)) {
      console.log(req.body.tokenRole, "forbidden");
      return ApiError.handle(new ForbiddenError("Forbidden, Access Denied"), res);
    }
    next();
  };
};