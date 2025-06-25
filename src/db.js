import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import pg from 'pg';

export const sequelize = 
 new Sequelize(process.env.DB_URL,{
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false,
    },
  },    
  logging:false,
}); 
  

