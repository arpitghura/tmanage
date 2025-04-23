import express, { NextFunction, Request, Response } from 'express';
import { nonTokenAPIs } from '../config';
import { ApiError, BadTokenError, TokenExpiredError } from '../core/ApiError';
import { prisma } from '../core/prismaClient';
import { verifyJWT } from '../utils/jwt';
import { isDateSame } from '../utils/dateUtil';

export class Auth {
  public authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('authMiddleware');
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && !Object.values(nonTokenAPIs).includes(req.url)) {
        // TOKEN VERIFICATION
        let token = req.headers.authorization.split(' ')[1];

        if (!token) {
          return ApiError.handle(new BadTokenError(), res);
        }

        const decoded: any = verifyJWT(token);

        const tokenDetails = await prisma.session.findUnique({
          where: {
            sessionToken: token,
            isLoggedIn: true,
          },
        });

        console.log('payload in auth middleware', decoded);

        if (!tokenDetails) {
          return ApiError.handle(new BadTokenError(), res);
        }

        //userId, ip,
        const { validUpto } = decoded;
        const { userId, expiresAt } = tokenDetails;

        if (decoded && !isDateSame(new Date(expiresAt), new Date(validUpto))) {
          return ApiError.handle(new BadTokenError(), res);
        }

        if (decoded && new Date(validUpto) < new Date()) {
          return ApiError.handle(new TokenExpiredError(), res);
        }

        const userDetails = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        let reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';

        req.body.userId = userId;
        req.body.tokenRole = userDetails?.role;

        // if (reqIp !== ip) {
        //   return ApiError.handle(new BadTokenError(), res);
        // }

        next();
      } else if (Object.values(nonTokenAPIs).includes(req.url)) {
        next();
      } else {
        return ApiError.handle(new BadTokenError(), res);
      }
    } catch (err) {
      console.log(err);
      return ApiError.handle(new TokenExpiredError(), res);
    }
  };


  public OrgAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Org-auth-Middleware');
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && !Object.values(nonTokenAPIs).includes(req.url)) {
        // TOKEN VERIFICATION
        let token = req.headers.authorization.split(' ')[1];

        if (!token) {
          return ApiError.handle(new BadTokenError(), res);
        }

        const decoded: any = verifyJWT(token);

        const tokenDetails = await prisma.session.findUnique({
          where: {
            sessionToken: token,
            isLoggedIn: true,
          },
        });

        console.log('payload in auth middleware', decoded);

        if (!tokenDetails) {
          return ApiError.handle(new BadTokenError(), res);
        }

        //userId, ip,
        const { validUpto } = decoded;
        const { userId, expiresAt } = tokenDetails;

        if (decoded && !isDateSame(new Date(expiresAt), new Date(validUpto))) {
          return ApiError.handle(new BadTokenError(), res);
        }

        if (decoded && new Date(validUpto) < new Date()) {
          return ApiError.handle(new TokenExpiredError(), res);
        }

        const userDetails = await prisma.organizationMember.findFirst({
          where: {
            userId,
          },
        });

        console.log('userDetails', userDetails);

        let reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';

        req.body.userId = userId;
        req.body.tokenRole = userDetails?.role;

        // if (reqIp !== ip) {
        //   return ApiError.handle(new BadTokenError(), res);
        // }

        next();
      } else if (Object.values(nonTokenAPIs).includes(req.url)) {
        next();
      } else {
        return ApiError.handle(new BadTokenError(), res);
      }
    } catch (err) {
      console.log(err);
      return ApiError.handle(new TokenExpiredError(), res);
    }
  };

  // public authMiddleware_v2 = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //   try {
  //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && !Object.values(nonTokenAPIs).includes(req.url)) {
  //       let token = req.headers.authorization.split(' ')[1];
  //       if (!token) {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }
  //       const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
  //       const source: string = req.body.source;
  //       const MOBILENO = req.header('Mobile');
  //       if ((source === 'INVW' || source === 'DITW') && (MOBILENO === '' || MOBILENO === undefined)) {
  //         return ApiError.handle(new BadRequestError('Please send Mobile in header'), res);
  //       }
  //       if (!source || source === '' || source === undefined || source === null) {
  //         return ApiError.handle(new BadRequestError('source should not be empty'), res);
  //       }
  //       let tokenDetails = await this.authsp.getCommonTokenDetails({ token, source }, res);
  //       if (tokenDetails) {
  //         // const { username, ip, tValidUpto, pan,mobileno,nameid } = decoded.payload;
  //         let username = decoded.payload?.username;
  //         //  let ip=decoded.payload?.ip;
  //         let tValidUpto = decoded.payload?.validUpto;
  //         let pan = decoded.payload?.pan;
  //         let mobileno = decoded?.mobile;
  //         //  let nameid=decoded.payload?.nameid;

  //         if (decoded && new Date(tValidUpto) < new Date()) {
  //           return ApiError.handle(new TokenExpiredError(), res);
  //         }
  //         //     if(nameid != source && source != ""){
  //         //       return ApiError.handle(new BadTokenError(), res);
  //         // }

  //         if (pan && pan !== '' && pan !== undefined) {
  //           let reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';

  //           // if (reqIp !== ip) {
  //           //   return ApiError.handle(new BadTokenError(), res);
  //           // }
  //           let PAN = req.body.pan || req.body.Pan || req.body.PAN || '';
  //           if (pan != PAN && PAN != '') {
  //             return ApiError.handle(new BadTokenError(), res);
  //           }

  //           res.setHeader('pan', pan);

  //           next();
  //         } else if (mobileno && mobileno !== '' && mobileno !== undefined) {
  //           // }else if(true){
  //           // res.setHeader('mobile', mobileno)

  //           if (mobileno != MOBILENO && MOBILENO != '') {
  //             return ApiError.handle(new BadTokenError(), res);
  //           }

  //           next();
  //         } else {
  //           // return ApiError.handle(new BadTokenError(), res);
  //           next();
  //         }
  //       } else {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }
  //     } else if (Object.values(nonTokenAPIs).includes(req.url)) {
  //       next();
  //     } else {
  //       return ApiError.handle(new BadTokenError(), res);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return ApiError.handle(new TokenExpiredError(), res);
  //   }
  // };

  // public arnAuthMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //   try {
  //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && !Object.values(nonTokenAPIs).includes(req.url)) {
  //       // TOKEN VARIFICATION
  //       let token = req.headers.authorization.split(' ')[1];

  //       if (!token) {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }

  //       const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

  //       let tokenDetails = await this.cams.getTokenDetails({ token, mobile: decoded.payload.mobile }, res);
  //       if (tokenDetails) {
  //         const { username, ip, tValidUpto } = decoded.payload;

  //         if (decoded && new Date(tValidUpto) < new Date()) {
  //           return ApiError.handle(new TokenExpiredError(), res);
  //         }

  //         let reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';
  //         next();
  //       } else {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }
  //     } else if (Object.values(nonTokenAPIs).includes(req.url)) {
  //       next();
  //     } else {
  //       return ApiError.handle(new BadTokenError(), res);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return ApiError.handle(new BadTokenError(), res);
  //   }
  // };

  // public stakeholderOffauthMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //   try {
  //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && !Object.values(nonTokenAPIs).includes(req.url)) {
  //       // TOKEN VARIFICATION
  //       let token = req.headers.authorization.split(' ')[1];

  //       if (!token) {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }

  //       const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
  //       let tokenDetails = await this.authsp.getStakeHolderTokenDetails({ token }, res);
  //       if (tokenDetails.Active === 'N' && req.url !== '/token/SREStakeholdertokenvalidation' && req.url !== '/token/SREOfficertokenvalidation') {
  //         return new SuccessResponse('success', 'Token is not Yet Validated or Tokendetails is undeifined').send(res);
  //       }
  //       if (tokenDetails) {
  //         const { userid, ip, validUpto } = decoded.payload;

  //         if (decoded && new Date(validUpto) < new Date()) {
  //           return ApiError.handle(new TokenExpiredError(), res);
  //         }

  //         let reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';

  //         // if (reqIp !== ip) {
  //         //   return ApiError.handle(new BadTokenError(), res);
  //         // }
  //         // let PAN = req.body.pan || req.body.Pan || req.body.PAN || '';
  //         // if (pan != PAN && PAN != '') {
  //         //   return ApiError.handle(new BadTokenError(), res);
  //         // }

  //         // res.setHeader('pan', pan);

  //         next();
  //       } else {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }
  //     } else if (Object.values(nonTokenAPIs).includes(req.url)) {
  //       next();
  //     } else {
  //       return ApiError.handle(new BadTokenError(), res);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return ApiError.handle(new TokenExpiredError(), res);
  //   }
  // };

  // public DemotokenformobileauthMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //   try {
  //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && !Object.values(nonTokenAPIs).includes(req.url)) {
  //       TOKEN VARIFICATION
  //       let token = req.headers.authorization.split(' ')[1];

  //       if (!token) {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }
  //       const Mobile = req.header('Mobile');
  //       const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
  //       let mobileno = decoded?.payload?.Mobile;
  //       if (mobileno != Mobile || Mobile == '' || mobileno == '') {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }

  //       let tokenDetails = await this.authsp.DemoTokenmobileSRE_Token_Details_Temp({ token }, res);

  //       if (tokenDetails.level2[0].Active === 'N' && req.url !== '/token/SREStakeholdertokenvalidation' && req.url !== '/token/SREOfficertokenvalidation') {
  //         return new SuccessResponse('success', 'Token is not Yet Validated or Tokendetails is undefined').send(res);
  //       }
  //       if (tokenDetails.EncryptionFlag === 'N') {
  //         return ApiError.handle(new TokenExpiredError(), res);
  //       }
  //       if (tokenDetails) {
  //         const { userid, ip, validUpto } = decoded.payload;

  //         if (decoded && new Date(validUpto) < new Date()) {
  //           return ApiError.handle(new TokenExpiredError(), res);
  //         }

  //         let reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';

  //         if (reqIp !== ip) {
  //           return ApiError.handle(new BadTokenError(), res);
  //         }
  //         let PAN = req.body.pan || req.body.Pan || req.body.PAN || '';
  //         if (pan != PAN && PAN != '') {
  //           return ApiError.handle(new BadTokenError(), res);
  //         }

  //         res.setHeader('pan', pan);

  //         next();
  //       } else {
  //         return ApiError.handle(new BadTokenError(), res);
  //       }
  //     } else if (Object.values(nonTokenAPIs).includes(req.url)) {
  //       next();
  //     } else {
  //       return ApiError.handle(new BadTokenError(), res);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return ApiError.handle(new TokenExpiredError(), res);
  //   }
  // };
}
