import express from 'express';
// import * as soap from "soap";

import { ApiError } from '../core/ApiError';

export abstract class BaseController {
  /**
   * wrapper function to handle catch condition on all async functions
   * @param fn any
   * @returns fn
   */
  protected catchAsyn = (fn: any) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      fn(req, res, next).catch((err: any) => {
        return ApiError.handle(err, res);
      });
    };
  };

  // protected soapRequest = async (url: string, args: any, methodName: any, _res: express.Response, options = {}) => {
  //   return new Promise((resolve, reject) => {
  //     soap.createClient(url, (error, client) => {
  //       if (error) {
  //         reject(error);
  //       }

  //       // @ts-ignore
  //       if (options?.useHeaders?.value) {
  //         // @ts-ignore
  //         client.addSoapHeader(options.useHeaders.data);
  //       }

  //       client[methodName](args, (err: any, result: any) => {
  //         if (err) {
  //           reject(err);
  //         }

  //         resolve(result);
  //       });
  //     });
  //   });
  // };
}
