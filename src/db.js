import * as dotenv from 'dotenv';
dotenv.config();
import Sequelize from 'sequelize';

export const sequelize = 
process.env.NODE_ENV === "production"
  ? new Sequelize({
    database:process.env.DB_NAME,
    dialect:"postgres",
    host:process.env.DB_HOST,
    port:3001,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }) : new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    {
      loggin:false,
      native:false,
    }
  ); 
