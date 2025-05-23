import { Response } from 'express';
import { DB_ENVIRONMENT } from '../database/database.config';
import {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
  FailureMsgResponse,
  NoDataResponse,
  SuccessMsgAlreadyReportedResponse,
  ConflictErrorResponse,
  ErrorResponse,
} from './ApiResponse';

export enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
  DB_ERROR = 'DBError',
  CORS_ERROR = 'CorsError',
  CONFLICT_ERROR = 'ConflictError',
  BASIC_ERROR = 'BasicError',
}

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = 'error', public Error_Message: string = 'error') {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.NO_DATA:
        return new NoDataResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res);
      case ErrorType.DB_ERROR:
        return new FailureMsgResponse(err.message).send(res);
      case ErrorType.CONFLICT_ERROR:
        return new ConflictErrorResponse(err.message).send(res);
      case ErrorType.BASIC_ERROR:
        return new ErrorResponse(err.message).send(res);
      default: {
        let message = err.message || err.Error_Message;
        // Do not send failure message in production as it may send sensitive data
        // if (DB_ENVIRONMENT === 'PROD') message = 'Something went wrong.';

        if (message === 'Already reported') {
          return new SuccessMsgAlreadyReportedResponse(message).send(res);
        }
        if (message.includes('Could not find stored procedure')) {
          return new InternalErrorResponse(message).send(res);
        }
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

export class CorsError extends ApiError {
  constructor(message: string | any = 'Not Allowed By CORS') {
    super(ErrorType.CORS_ERROR, message);
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = 'Invalid Credentials') {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string | any = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message);
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}

export class BadTokenError extends ApiError {
  constructor(message = 'Invalid Token') {
    super(ErrorType.BAD_TOKEN, message);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message = 'Session Time Out. Please login to continue') {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}

export class NoDataError extends ApiError {
  constructor(message = 'No data available') {
    super(ErrorType.NO_DATA, message);
  }
}

export class AccessTokenError extends ApiError {
  constructor(message = 'Invalid access token') {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}

export class DBValidationError extends ApiError {
  constructor(message = 'Invalid inputs') {
    super(ErrorType.DB_ERROR, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Conflict Error') {
    super(ErrorType.CONFLICT_ERROR, message);
  }
}

export class BasicError extends ApiError {
  constructor(message = 'Error') {
    super(ErrorType.BASIC_ERROR, message);
  }
}
