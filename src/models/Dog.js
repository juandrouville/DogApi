import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../db.js';
import { Temperament } from './Temperament.js';

export const Dog = sequelize.define('dog',
 {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.INTEGER,
      allowNull : false,
      primaryKey: true,
    },
    weight_min:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    weight_max:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    height:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    life:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      
    },
    dogApi:{
      type:DataTypes.ARRAY(Sequelize.STRING),
      allowNull:true,
    }
  }
);

Dog.belongsToMany(Temperament,{through:"dog-temperament"});
Temperament.belongsToMany(Dog,{through:"dog-temperament"});