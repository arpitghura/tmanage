import pg from 'pg';
import dotenv from 'dotenv';
import { DB_CONFIGS, DB_ENVIRONMENT } from './database/database.config';
dotenv.config();

const connectionData = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

//@ts-ignore
export const postgresConfig = new pg.Pool(connectionData);

export async function connectToDB() {
  try {
    console.log('DB connection started');
    await postgresConfig.connect();
    console.log('Postgresql connected');

  } catch (err) {
    console.log(err);
    console.log('DB Not connected');
  }
}
