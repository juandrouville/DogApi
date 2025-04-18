import { Dog } from '../models/Dog.js';
import { Temperament } from '../models/Temperament.js';
import { Op } from "sequelize";
import { uuid } from 'uuidv4';

export async function getQueryName(query){
    var response = await Dog.findAll({
        where:{
            name:{
                [Op.iLike]:`%${query}%`
            },
        },
        include:{
            model:Temperament,
            attributes:["id","name"],
        },
        attributes:{exclude : ["createdAt","updatedAt","dogApi"]},
    });
    return response;
};



function stringArray(string){
    return string.split(',');
};

function selectMin (string){
    var min = string.split('-');
    return min[0]? parseInt(min[0]) : 0 ;
};

function selectMax (string){
    var min = string.split('-');
    return min[1]? parseInt(min[1]) : 0;
};

export async function allCreate(array){
    try{
        for ( var ele in array){
            await Dog.findOrCreate(
                    {where:{
                        id:uuid(),
                        name:array[ele].name,
                        // image:array[ele].image.url,
                        life:array[ele].life_span,
                        weight_min:array[ele].weight.metric? selectMin(array[ele].weight.metric) : 0,
                        weight_max:array[ele].weight.metric? selectMax(array[ele].weight.metric) : 0,
                        height:array[ele].height.metric,
                        dogApi:array[ele].temperament? stringArray(array[ele].temperament) : ['Empty'],
                    },
                });
            await setRelation(array[ele].name);
        };
    } catch(error){return console.error(error)};
};

export async function setRelation(name){ 
   try {
       var dog = await Dog.findOne({
           where:{
               name:name,
           },
       });
        for (var i in dog.dogApi){
           await Temperament.findOrCreate({where:{name:dog.dogApi[i]}});
           if(dog.dogApi[i] !== undefined || dog.dogApi[i] !== null){
               var temperament = await Temperament.findOne({where:{name:dog.dogApi[i]}});
               await temperament.addDogs(dog);
           };
       };
   } catch (error){return console.error(error)};
};               
