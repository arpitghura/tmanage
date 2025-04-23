import nodemailer from 'nodemailer';
import { SMTP_DETAILS } from '../../config';
import { DB_ENVIRONMENT } from '../../database/database.config';

interface EmailData {
  email: string;
  subject: string;
  text?: string;
  html?: string;
  headers?: any;
  cc?: any;
  bcc?: any;
  content?: Buffer;
  filename?: string;
}

export class EmailService {
  static async sendEmail(data: EmailData) {
    return new Promise(async (resolve, reject) => {
      let transporter = nodemailer.createTransport({
        // @ts-ignore
        host: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_HOST,
        port: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PORT,
        // pool: true,
        service: 'gmail',
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_USER,
          pass: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PASSWORD,
        },
        logger: false,
        skipVerify: true,
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

// export class EmailServiceStackholder {
//   static async sendEmail(data: any) {
//     return new Promise(async (resolve, reject) => {
//       let transporter = nodemailer.createTransport({
//         // @ts-ignore
//         // host: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_HOST,
//         // port: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PORT,
//         pool: true,
//         tls: {
//           rejectUnauthorized: false,
//         },
//         auth: {
//         user: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_USER,
//         pass: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PASSWORD,
//         },
//         logger: false,
//       });

//       // Read the attachment file
//       let attachments = [];
//       if (data.attachments) {
//         for (let attachment of data.attachments) {
//           const content = fs.readFileSync(attachment.path);
//           attachments.push({
//             filename: attachment.filename,
//             content: content,
//             contentType: 'application/octet-stream',
//           });
//         }
//       }

//       transporter.sendMail(
//         {
//           from: SMTP_DETAILS[DB_ENVIRONMENT].FROM_ADDRESS,
//           to: data.email,
//           cc: SMTP_DETAILS[DB_ENVIRONMENT].CC,
//           bcc: SMTP_DETAILS[DB_ENVIRONMENT].BCC,
//           subject: data.subject,
//           text: data.text,
//           html: data.html,
//           attachments: attachments,
//           headers: data.headers,
//         },
//         (err, info) => {
//           if (err) return reject(err);
//           resolve(info.response);
//         }
//       );
//     });
//   }
// }

// export class EmailServiceDailyEndorsementReport {
//   static async sendEmail(data: any) {
//     return new Promise(async (resolve, reject) => {
//       let transporter = nodemailer.createTransport({
//         // @ts-ignore
//         host: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_HOST,
//         port: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PORT,
//         pool: true,
//         tls: {
//           rejectUnauthorized: false,
//         },
//         // auth: {
//         // user: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_USER,
//         // pass: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PASSWORD,
//         // },
//         logger: false,
//       });

//       // Read the attachment file
//       let attachments = [];
//       if (data.attachments) {
//         console.log(data);
//         for (let attachment of data.attachments) {
//           const content = fs.readFileSync(attachment.path);
//           attachments.push({
//             filename: attachment.filename,
//             content: content,
//             contentType: 'application/octet-stream',
//           });
//         }
//       }

//       transporter.sendMail(
//         {
//           from: SMTP_DETAILS[DB_ENVIRONMENT].FROM_ADDRESS,
//           to: data.email,
//           cc: SMTP_DETAILS[DB_ENVIRONMENT].CC,
//           bcc: SMTP_DETAILS[DB_ENVIRONMENT].BCC,
//           subject: data.subject,
//           text: data.text,
//           html: data.html,
//           attachments: attachments,
//           headers: data.headers,
//         },
//         (err, info) => {
//           if (err) return reject(err);
//           resolve(info.response);
//         }
//       );
//     });
//   }
// }

// export class EmailServiceforCPUUtilization {
//   static async sendEmail(data: EmailData) {
//     return new Promise(async (resolve, reject) => {
//       let transporter = nodemailer.createTransport({
//         // @ts-ignore
//         host: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_HOST,
//         port: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PORT,
//         pool: true,
//         tls: {
//           rejectUnauthorized: false,
//         },
//         // auth: {
//         //   user: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_USER,
//         //   pass: SMTP_DETAILS[DB_ENVIRONMENT].SMTP_PASSWORD,
//         // },
//         logger: false,
//       });

//       transporter.sendMail(
//         {
//           from: SMTP_DETAILS[DB_ENVIRONMENT].FROM_ADDRESS,
//           to: data.email,
//           cc: SMTP_DETAILS[DB_ENVIRONMENT].CC,
//           bcc: SMTP_DETAILS[DB_ENVIRONMENT].BCC,
//           subject: data.subject,
//           text: data.text,
//           html: data.html,
//           // attachments: [
//           //   {
//           //     filename: data.filename,
//           //     content: data.content,
//           //     contentType: 'application/octet-stream',
//           //   },
//           // ],
//           headers: data.headers,
//         },

//         (err, info) => {
//           if (err) return reject(err);
//           resolve(info.response);
//         }
//       );
//     });
//   }
// }
