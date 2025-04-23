import express from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { Database } from './../database/database';
import { EncryptionAndDecryption } from './Encryption&Decryption';
import { ENABLE_ENCRYPTION, NON_ENCRYPTION_ENDPOINTS } from '../config';
import { ApiError, InternalError } from './ApiError';
export class Logger extends Database {
  constructor(private response: express.Response, private request: express.Request, private statusCode: string, private status: number, private clientResponse: any) {
    super();
    this.createLog();
  }
 
  private createLog = async () => {
    let formatted_date = moment(new Date()).format('YYYY-MM-DD kk:mm:ss.SSS');
    let method = this.request.method;
    let url = this.request.url;
    let status = this.statusCode;
    let fullUrl = this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;
 
    let activityLogDetails: any = {};
    let errorLogDetails: any = {};
 
    let start = this.response.get('start') || new Date();
 
    const duration = Date.now() - +start;
    let log = `[${formatted_date}] ${method}:${url} ${status} ${this.status} ${duration}ms`;
 
    const { pan = null, mobile = null, email = null } = this.request.headers;
 
    if (this.status.toString().startsWith('2')) {
      let clientResponseClone = JSON.parse(JSON.stringify(this.clientResponse));
      let url = this.request.originalUrl.split('v1')[1];
      if (this.clientResponse.hasOwnProperty('data') && ENABLE_ENCRYPTION && !NON_ENCRYPTION_ENDPOINTS.includes(url) && url !== '/token/create') {
        clientResponseClone.data = EncryptionAndDecryption.decryption(clientResponseClone.data);
      }
 
      const transactionsDetails = {
        headers: JSON.stringify(this.request.headers),
        body: this.request.body,
        query: this.request.query,
        response: JSON.stringify(clientResponseClone),
      };
 
      activityLogDetails = {
        email,
        activityDateTime: formatted_date,
        deviceDetails: this.request.ip,
        method,
        endPoint: fullUrl,
        status: +status,
        statusCode: +this.status,
        responseTime: `${duration}ms`,
        transactionsDetails: JSON.stringify(transactionsDetails),
        source: this.request.body?.source ? this.request.body?.source : ''
      };
 
      log += `\n${JSON.stringify(activityLogDetails)}\n-------------------------------`;
      this.generateLogFile(log, this.status);
      // await this._saveSuccessLogsToDB(activityLogDetails, this.response);
    }
 
    if (!this.status.toString().startsWith('2')) {
      const transactionsDetails = {
        headers: JSON.stringify(this.request.headers),
        body: this.request.body,
        query: this.request.query,
        response: JSON.stringify(this.clientResponse),
      };
 
      errorLogDetails = {
        email,
        activityDateTime: formatted_date,
        deviceDetails: this.request.ip,
        errorMethod: method,
        endPoint: fullUrl,
        errorCode: +status,
        statusCode: +this.status,
        responseTime: `${duration}ms`,
        errorDetails: this.clientResponse.message,
        transactionsDetails: JSON.stringify(transactionsDetails),
        source: this.request.body?.source ? this.request.body?.source : ''
      };
      log += `\n${JSON.stringify(errorLogDetails)}\n-------------------------------`;
      this.generateLogFile(log, this.status);
      //await this._saveErrorLogsToDB(errorLogDetails, this.response);
    }
  };
 
  // private _saveSuccessLogsToDB = async (obj: any, _res: express.Response) => {
  //   const spName = '[dbo].[ktrack_sre_activitylog_saving]';
  //   const parameters: StoredProcedureParameters[] = [
  //     { name: 'activity_by_pan', type: sql.VarChar, variableType: 'IN', value: obj.pan },
  //     { name: 'activity_by_mobile', type: sql.VarChar, variableType: 'IN', value: obj.mobile },
  //     { name: 'activity_by_email', type: sql.VarChar, variableType: 'IN', value: obj.email },
  //     { name: 'activity_datetime', type: sql.VarChar, variableType: 'IN', value: obj.activityDateTime },
  //     { name: 'activity_device_details', type: sql.VarChar, variableType: 'IN', value: obj.deviceDetails },
  //     { name: 'method', type: sql.VarChar, variableType: 'IN', value: obj.method },
  //     { name: 'end_point', type: sql.VarChar, variableType: 'IN', value: obj.endPoint },
  //     { name: 'status', type: sql.VarChar, variableType: 'IN', value: obj.status },
  //     { name: 'status_code', type: sql.VarChar, variableType: 'IN', value: obj.statusCode },
  //     { name: 'response_time', type: sql.VarChar, variableType: 'IN', value: obj.responseTime },
  //     { name: 'transactions_details', type: sql.VarChar, variableType: 'IN', value: obj.transactionsDetails },
  //     { name: 'source', type: sql.VarChar, variableType: 'IN', value: obj.source },
  //   ];
  //   return await this.executeStoreProcedure(spName, parameters, KBOLTConnection)
  //     .then((data: any) => {
  //       return data;
  //     })
  //     .catch((err) => {
  //       ApiError.handle(err, _res);
  //     });
  // };
 
  // private _saveErrorLogsToDB = async (obj: any, _res: express.Response) => {
  //   const spName = '[dbo].[ktrack_sre_Errorlog_saving]';
  //   const parameters: StoredProcedureParameters[] = [
  //     { name: 'activity_by_pan', type: sql.VarChar, variableType: 'IN', value: obj.pan },
  //     { name: 'activity_by_mobile', type: sql.VarChar, variableType: 'IN', value: obj.mobile },
  //     { name: 'activity_by_email', type: sql.VarChar, variableType: 'IN', value: obj.email },
  //     { name: 'activity_datetime', type: sql.VarChar, variableType: 'IN', value: obj.activityDateTime },
  //     { name: 'activity_device_details', type: sql.VarChar, variableType: 'IN', value: obj.deviceDetails },
  //     { name: 'activity_error_method', type: sql.VarChar, variableType: 'IN', value: obj.errorMethod },
  //     { name: 'end_point', type: sql.VarChar, variableType: 'IN', value: obj.endPoint },
  //     { name: 'acivity_error_code', type: sql.VarChar, variableType: 'IN', value: obj.errorCode },
  //     { name: 'status_code', type: sql.VarChar, variableType: 'IN', value: obj.statusCode },
  //     { name: 'response_time', type: sql.VarChar, variableType: 'IN', value: obj.responseTime },
  //     { name: 'activity_error_details', type: sql.VarChar, variableType: 'IN', value: obj.errorDetails },
  //     { name: 'transaction_details', type: sql.VarChar, variableType: 'IN', value: obj.transactionsDetails },
  //     { name: 'source', type: sql.VarChar, variableType: 'IN', value: obj.source },
  //   ];
  //   return await this.executeStoreProcedure(spName, parameters, KBOLTConnection)
  //     .then((data: any) => {
  //       return data;
  //     })
  //     .catch((err) => {
  //       ApiError.handle(err, _res);
  //     });
  // };
 
  private generateLogFile = (log: string, status: number) => {
    let mainFolder = 'logs';
    let subFolder = status.toString().startsWith('2') ? 'success' : 'error';
    let dir = `${mainFolder}/${subFolder}`;
    let successLogsFileName = `${moment(new Date()).format('YYYY-MM-DD')}-success_logs.log`;
    let errorLogsFileName = `${moment(new Date()).format('YYYY-MM-DD')}-error_log.log`;
    let fileName = status.toString().startsWith('2') ? successLogsFileName : errorLogsFileName;
 
    if (!dir) dir = path.resolve(`logs/${subFolder}`);
 
    // create directory if it is not present
    if (!fs.existsSync(mainFolder)) {
      // Create the directory if it does not exist
      fs.mkdirSync(mainFolder);
 
      // create directory if it is not present
      if (!fs.existsSync(dir)) {
        // Create the directory if it does not exist
        fs.mkdirSync(dir);
      }
    } else {
      // create directory if it is not present
      if (!fs.existsSync(dir)) {
        // Create the directory if it does not exist
        fs.mkdirSync(dir);
      }
    }
 
    fs.appendFile(`${dir}/${fileName}`, log + '\n', (err) => {
      if (err) console.log(err);
    });
  };
}
/*import express from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

import { Database } from './../database/database';
import { EncryptionAndDecryption } from './Encryption&Decryption';
import { ENABLE_ENCRYPTION, NON_ENCRYPTION_ENDPOINTS } from '../config';
import { ApiError, InternalError } from './ApiError';
import { BajajMFConnection } from '../db';

export class Logger extends Database {
  constructor(private response: express.Response, private request: express.Request, private statusCode: string, private status: number, private clientResponse: any) {
    super();
    this.createLog();
  }

  private createLog = async () => {
    let formatted_date = moment(new Date()).format('YYYY-MM-DD kk:mm:ss.SSS');
    let method = this.request.method;
    let url = this.request.url;
    let status = this.statusCode;
    let fullUrl = this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;

    let activityLogDetails: any = {};
    let errorLogDetails: any = {};

    let start = this.response.get('start') || new Date();

    const duration = Date.now() - +start;
    let log = `[${formatted_date}] ${method}:${url} ${status} ${this.status} ${duration}ms`;

    const { pan = null, mobile = null, email = null } = this.request.headers;

    if (this.status.toString().startsWith('2')) {
      let clientResponseClone = JSON.parse(JSON.stringify(this.clientResponse));
      let url = this.request.originalUrl.split('v1')[1];
      if (this.clientResponse.hasOwnProperty('data') && ENABLE_ENCRYPTION && !NON_ENCRYPTION_ENDPOINTS.includes(url) && url !== '/token/create') {
        clientResponseClone.data = EncryptionAndDecryption.decryption(clientResponseClone.data);
      }

      const transactionsDetails = {
        headers: JSON.stringify(this.request.headers),
        body: this.request.body,
        query: this.request.query,
        response: JSON.stringify(clientResponseClone),
      };

      activityLogDetails = {
        pan,
        mobile,
        email,
        activityDateTime: formatted_date,
        deviceDetails: this.request.ip,
        method,
        endPoint: fullUrl,
        status: +status,
        statusCode: +this.status,
        responseTime: `${duration}ms`,
        transactionsDetails: JSON.stringify(transactionsDetails),
        source:this.request.body?.source? this.request.body?.source:''
      };

      log += `\n${JSON.stringify(activityLogDetails)}\n-------------------------------`;
      this.generateLogFile(log, this.status);
      await this._saveSuccessLogsToDB(activityLogDetails, this.response);
    }

    if (!this.status.toString().startsWith('2')) {
      const transactionsDetails = {
        headers: JSON.stringify(this.request.headers),
        body: this.request.body,
        query: this.request.query,
        response: JSON.stringify(this.clientResponse),
      };

      errorLogDetails = {
        pan,
        mobile,
        email,
        activityDateTime: formatted_date,
        deviceDetails: this.request.ip,
        errorMethod: method,
        endPoint: fullUrl,
        errorCode: +status,
        statusCode: +this.status,
        responseTime: `${duration}ms`,
        errorDetails: this.clientResponse.message,
        transactionsDetails: JSON.stringify(transactionsDetails),
        source:this.request.body?.source? this.request.body?.source:''
      };

      log += `\n${JSON.stringify(errorLogDetails)}\n-------------------------------`;
      this.generateLogFile(log, this.status);
      await this._saveErrorLogsToDB(errorLogDetails, this.response);
    }
  };

  private _saveSuccessLogsToDB = (obj: any, _res: express.Response) => {
    return new Promise(async (resolve, reject) => {
      try {
        // this.setPGConfig('KFINLOGS');

        const query = `INSERT INTO ktrack_Wb99_bajaj_activitylog(
        activity_by_pan, activity_by_mobile, activity_by_email, activity_datetime, activity_device_details, method, end_point, status, status_code, response_time, transactions_details,source)
        VALUES ('${obj.pan}', '${obj.mobile}', '${obj.email}', '${obj.activityDateTime}', '${obj.deviceDetails}', '${obj.method}', '${obj.endPoint}', '${obj.status}', '${obj.statusCode}', '${obj.responseTime}', '${obj.transactionsDetails}', '${obj.source}');`;

        await this.executeQuery(query, BajajMFConnection);

        resolve(true);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  private _saveErrorLogsToDB = (obj: any, _res: express.Response) => {
    return new Promise(async (resolve, reject) => {
      try {
        // this.setPGConfig('KFINLOGS');

        const query = `INSERT INTO ktrack_Wb99_bajaj_Errorlog(
          activity_by_pan, activity_by_mobile, activity_by_email, activity_datetime, activity_device_details, activity_error_method, end_point, acivity_error_code, status_code, response_time, activity_error_details, transaction_details,source)
        VALUES ('${obj.pan}', '${obj.mobile}', '${obj.email}', '${obj.activityDateTime}', '${obj.deviceDetails}', '${obj.errorMethod}', '${obj.endPoint}', '${obj.errorCode}', '${obj.statusCode}', '${obj.responseTime}', '${obj.errorDetails}', '${obj.transactionsDetails}', '${obj.source}');`;

        await this.executeQuery(query, BajajMFConnection);

        resolve(true);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  private generateLogFile = (log: string, status: number) => {
    let mainFolder = 'logs';
    let subFolder = status.toString().startsWith('2') ? 'success' : 'error';
    let dir = `${mainFolder}/${subFolder}`;
    let successLogsFileName = `${moment(new Date()).format('YYYY-MM-DD')}-success_logs.log`;
    let errorLogsFileName = `${moment(new Date()).format('YYYY-MM-DD')}-error_log.log`;
    let fileName = status.toString().startsWith('2') ? successLogsFileName : errorLogsFileName;

    if (!dir) dir = path.resolve(`logs/${subFolder}`);

    // create directory if it is not present
    if (!fs.existsSync(mainFolder)) {
      // Create the directory if it does not exist
      fs.mkdirSync(mainFolder);

      // create directory if it is not present
      if (!fs.existsSync(dir)) {
        // Create the directory if it does not exist
        fs.mkdirSync(dir);
      }
    } else {
      // create directory if it is not present
      if (!fs.existsSync(dir)) {
        // Create the directory if it does not exist
        fs.mkdirSync(dir);
      }
    }

    fs.appendFile(`${dir}/${fileName}`, log + '\n', (err) => {
      if (err) console.log(err);
    });
  };
}
*/