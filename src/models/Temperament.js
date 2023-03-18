import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; 

export const Temperament = sequelize.define('temperament',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
});
