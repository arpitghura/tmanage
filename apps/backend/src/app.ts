import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import useragent from 'express-useragent';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import moment from 'moment';

import { ENABLE_ENCRYPTION, ENCRYPTION_SECRET_KEY, NON_ENCRYPTION_ENDPOINTS, 
  PATH, SERVER_IPS, StatusCode } from './config';

import { ApiError, BadRequestError, CorsError, InternalError, NotFoundError } from './core/ApiError';
import { EncryptionAndDecryption } from './core/Encryption&Decryption';
import { SuccessResponse } from './core/ApiResponse';

import Controller from './interfaces/controller.interface';
import { errorTemplate } from './utils/email/templates/error.template';
import { connectToDB } from './db';
import dotenv from 'dotenv';

class App {
  public app: express.Application;
  public port: any;

  private CORS_ALLOWED_ENDPOINTS = [...SERVER_IPS.DEV, ...SERVER_IPS.SIT, ...SERVER_IPS.PROD];

  constructor(controllers: Controller[], port: any) {
    // Initializing Express Application
    this.app = express();
    this.port = port;

    dotenv.config();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use((_, res, next) => {
      res.set('start', `${Date.now()}`);
      next();
    });

    // JSON Response Size Limit
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req: Request, _: Response, next: NextFunction) => {
      // Setting Request Origin Header (if originally not found then host will become origin)
      req.headers.origin = req.headers.origin || req.headers.host;

      next();
    });

    const corsOptions: any = {
      origin: (origin: any, callback: Function) => {
        !origin || this.CORS_ALLOWED_ENDPOINTS.indexOf(origin) !== -1 ? callback(null, true) : callback(new CorsError());
      },
    };

    const limiter = rateLimit({
      windowMs: 30 * 1000, // 30 secs
      max: 100, // limit each IP to 10 requests per windowMs
      message: 'Too many requests created, please try again after 30 seconds',
    });

    this.app.use('/uploads', express.static(path.join(__dirname, './images')));
    this.app.use((req, res, next) => {
      // Allow requests from any origin
      res.header('Access-Control-Allow-Origin', '*');
      // res.header('Access-Control-Allow-Methods', 'GET, POST');
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      // Allow the specified HTTP methods
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
      // Allow the specified headers
      res.header('Access-Control-Allow-Credentials', 'true');
      // Allow sending cookies

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.status(200).end();
      } else {
        next();
      }
    });
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(helmet.xssFilter());
    this.app.use(useragent.express());
    this.app.use(limiter);
    this.app.set('etag', false);
    this.app.use(function (req, res, next) {
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.removeHeader('X-XSS-Protection');
      next();
    });

    // Load environment variables from .env file
    dotenv.config();
    
    this.app.get(PATH, async (req, res, next) => {
      return new SuccessResponse('success', 'Welcome to TManage').send(res);
    });

    // this.app.get('/metrics', async (req, res) => {
    //   res.set('Content-Type', register.contentType);
    //   res.end(await register.metrics());
    // });

    this.app.use(async (req, res, next) => {
      if (ENABLE_ENCRYPTION === true && !NON_ENCRYPTION_ENDPOINTS.includes(req.url) 
          && !req.headers['content-type']?.includes('multipart/form-data')) {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          let token = req.headers.authorization.split(' ')[1];
          //let tokenDetails = await this.authSP.getTokenDetails({ token }, res);

          //EncryptionAndDecryption.encryptionKey = tokenDetails.encryptionKey;
        }
        const result = EncryptionAndDecryption.decryption(req.body.data);

        if (result === StatusCode.INVALID_ENCRYPTED_INPUT) {
          return ApiError.handle(new BadRequestError('Invalid Encrypted String'), res);
        } else {
          req.body = result;
        }
      }
      next();
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(PATH, controller.router);
    });
  }

  private initializeErrorHandling() {
    // catch 404 and forward to error handler
    this.app.use((_req, res, _next) => {
      return ApiError.handle(new NotFoundError(), res);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ApiError) {
        return ApiError.handle(err, res);
      } else {
        // if (DB_ENVIRONMENT !== 'PROD') {
        return res.status(500).send(err.message);
        // }
        // return ApiError.handle(new InternalError(), res);
      }
    });

    // Handling unknown Error that impact the work of backend
    process.on('unhandledRejection', (error: any) => {
      if (error.code !== 'ERR_HTTP_HEADERS_SENT') {
        console.log('unhandledRejection', error.message);
        console.log('unhandledRejection', error.stack);
        const emailDetails = {
          projectName: 'TManage Backend Prod',
          projectURL: process.env.PROJECT_URL,
          errorCode: error.code,
          errorTime: moment(new Date()).format('DD MMMM, YYYY hh:mm:ss A'),
          errorSummary: error.message,
          errorDetails: error.stack,
        };

        const emailObj = {
          email: 'arpitghura36@gmail.com',
          subject: 'Error in TManage Backend',
          html: errorTemplate(emailDetails),
        };
        // Trigger Email to the owners regarding the issue
        // EmailService.sendEmail(emailObj);
      }
    });
  }

  public async listen() {
    await connectToDB();
    
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  
}

export default App;

