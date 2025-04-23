import nodemailer from 'nodemailer';
import { SMTP_DETAILS } from '../../config';
import { DB_ENVIRONMENT } from '../../database/database.config';

interface EmailAttachmentData {
  email: string | string[];
  subject: string;
  text?: string;
  html?: string;
  filename?: string;
  //   filePath?:string
  headers?: any;
  content?: Buffer;
  content1?: Buffer;
  filename1?: string;
  cc?: any;
  bcc?: any;
}

export class EmailAttachmentService {
  static async sendEmail(data: EmailAttachmentData) {
    return new Promise(async (resolve, reject) => {
      let transporter = nodemailer.createTransport({
        // @ts-ignore
        host: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_HOST,
        port: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PORT,
        pool: true,
        tls: {
          rejectUnauthorized: false,
        },
        // auth: {
        //   user: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_USER,
        //   pass: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PASSWORD,
        // },
        logger: false,
      });

      transporter.sendMail(
        {
          from: SMTP_DETAILS[DB_ENVIRONMENT].FROM_ADDRESS,
          to: data.email,
          cc: SMTP_DETAILS[DB_ENVIRONMENT].CC,
          bcc: SMTP_DETAILS[DB_ENVIRONMENT].BCC,
          subject: data.subject,
          text: data.text,
          html: data.html,
          attachments: [
            {
              filename: data.filename,
              content: data.content,
              contentType: 'application/octet-stream',
            },
            {
              filename: data.filename1,
              content: data.content1,
              contentType: 'application/octet-stream',
            },
          ],
          headers: data.headers,
        },
        (err, info) => {
          if (err) return reject(err);
          resolve(info.response);
        }
      );
    });
  }
}

export class EmailAttachmentService1 {
  static async sendEmail(data: EmailAttachmentData) {
    return new Promise(async (resolve, reject) => {
      let transporter = nodemailer.createTransport({
        // @ts-ignore
        host: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_HOST,
        port: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PORT,
        pool: true,
        tls: {
          rejectUnauthorized: false,
        },
        // auth: {
        //   user: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_USER,
        //   pass: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PASSWORD,
        // },
        logger: false,
      });

      transporter.sendMail(
        {
          from: SMTP_DETAILS[DB_ENVIRONMENT].FROM_ADDRESS,
          to: data.email,
          cc: SMTP_DETAILS[DB_ENVIRONMENT].CC,
          bcc: SMTP_DETAILS[DB_ENVIRONMENT].BCC,
          subject: data.subject,
          text: data.text,
          html: data.html,
          attachments: [
            {
              filename: data.filename,
              content: data.content,
              contentType: 'application/octet-stream',
            },
          ],
          headers: data.headers,
        },
        (err, info) => {
          if (err) return reject(err);
          resolve(info.response);
        }
      );
    });
  }
}

export class EmailOneAttachmentService {
  static async sendEmail(data: EmailAttachmentData) {
    return new Promise(async (resolve, reject) => {
      let transporter = nodemailer.createTransport({
        // @ts-ignore
        host: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_HOST,
        port: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PORT,
        pool: true,
        tls: {
          rejectUnauthorized: false,
        },
        // auth: {
        //   user: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_USER,
        //   pass: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PASSWORD,
        // },
        logger: false,
      });

      transporter.sendMail(
        {
          from: SMTP_DETAILS[DB_ENVIRONMENT].FROM_ADDRESS,
          to: data.email,
          cc: SMTP_DETAILS[DB_ENVIRONMENT].CC,
          bcc: SMTP_DETAILS[DB_ENVIRONMENT].BCC,
          subject: data.subject,
          text: data.text,
          html: data.html,
          attachments: [
            {
              filename: data.filename,
              content: data.content,
              contentType: 'application/octet-stream',
            },
          ],
          headers: data.headers,
        },
        (err, info) => {
          if (err) return reject(err);
          resolve(info.response);
        }
      );
    });
  }
}
