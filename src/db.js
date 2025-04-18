import dotenv from 'dotenv';
dotenv.config();
import  Sequelize  from 'sequelize';

const sequelize = 
 new Sequelize({
  dialect:'postgres',
  host:process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.nextTick.DB_PORT,
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false,
    },
  },    
  loggin:false,
}); 
  
export default sequelize;
