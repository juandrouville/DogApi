import dotenv from 'dotenv';
dotenv.config();
import Sequelize from 'sequelize';

export const sequelize = 
 new Sequelize({
  dialect:'postgres',
  host:process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false,
    },
  },    
  logging:false,
}); 
  

