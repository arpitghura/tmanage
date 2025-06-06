import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { ApiError, BadRequestError } from '../core/ApiError';

function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    console.log(req.body);
    validate(
      plainToClass(type, req.body), 
      { skipMissingProperties }
    ).then(
      (errors: ValidationError[]) => {
        console.log(errors);
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => {
            return {
              [error.property]: Object.values(error.constraints).join('. '),
            };
          });

          return ApiError.handle(new BadRequestError(message), res);
        } else {
          next();
        }
      }
    );
  };
}

export default validationMiddleware;
