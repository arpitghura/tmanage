import { Response, Request } from 'express';
import { ENABLE_ENCRYPTION, ENCRYPTION_SECRET_KEY, ResponseStatus, StatusCode } from '../config';
import Database from '../database/database';
import { EncryptionAndDecryption } from './Encryption&Decryption';
import { Logger } from './Logger';

abstract class ApiResponse extends Database {

  constructor(protected statusCode: StatusCode, protected status: ResponseStatus, protected message: string) {
    super();
  }

  // @ts-ignore
  protected async prepare<T extends ApiResponse>(res: Response, response: T): Response {
    if (res.req.url === '/token/create') {
      EncryptionAndDecryption.encryptionKey = ENCRYPTION_SECRET_KEY;
      // @ts-ignore
    } else if (ENABLE_ENCRYPTION === true && response['data'] && res.req.url !== '/security/encryption' && res.req.url !== '/security/decryption' && res.req.url !== '/security/saltencryption') {
      if (res.req.headers.authorization && res.req.headers.authorization.startsWith('Bearer')) {
        let token = res.req.headers.authorization.split(' ')[1];

        //let tokenDetails = await this.authSP.getTokenDetails({ token }, res);
        // EncryptionAndDecryption.encryptionKey = tokenDetails.encryptionKey;
      }
    }

    const clientResponse = ApiResponse.sanitize(response, res.req.url, res.req);
    new Logger(res, res.req, this.statusCode, this.status, clientResponse);
    res.removeHeader('start');

    return res.status(this.status).json(clientResponse);
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T, url: string, req: Request) {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    // @ts-ignore
    // delete clone.authSP;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    // @ts-ignore
    if (ENABLE_ENCRYPTION === true && clone['data'] && url !== '/security/encryption' && url !== '/security/decryption' && url !== '/security/saltencryption') {
      // @ts-ignore
      clone['data'] = EncryptionAndDecryption.encryption(clone['data']);
    }

    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.INVALID_TOKEN, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = 'Not Found') {
    super(StatusCode.NOT_FOUND, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

export class NoDataResponse extends ApiResponse {
  constructor(message = 'No Data') {
    super(StatusCode.NO_DATA, ResponseStatus.SUCCESS, message);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FORBIDDEN, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.BAD_REQUEST, ResponseStatus.BAD_REQUEST, message);
  }
}

export class ConflictErrorResponse extends ApiResponse {
  constructor(message = 'Conflict Error') {
    super(StatusCode.NO_DATA, ResponseStatus.CONFLICT, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessMsgAlreadyReportedResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.ALEADY_REPORTED, message);
  }
}

export class FailureMsgResponse<T> extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<FailureMsgResponse<T>>(res, this);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data?: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}

export class ErrorResponse<T> extends ApiResponse {
  constructor(message: string, private data?: T) {
    super(StatusCode.ERROR, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<ErrorResponse<T>>(res, this);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(message: string, private accessToken: string, private refreshToken: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
