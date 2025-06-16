import dotenv from 'dotenv';
dotenv.config();
import Sequelize from 'sequelize';

export const sequelize = 
 new Sequelize(process.env.DB_URL,{
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false,
    },
  },    
  logging:false,
}); 
  

