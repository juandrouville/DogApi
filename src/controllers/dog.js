import { Dog } from'../models/Dog.js';
import { Temperament } from '../models/Temperament.js';
import axios from 'axios';
import { uuid } from 'uuidv4';
import { getQueryName, allCreate } from './functions.js';


// -----------GETs-------------------------------
// Get all Dogs and Get by query

export async function getAllDogs(req,res){
   var queryName = req.query.name;
   var limit = 8;
   var offset = 0;
   var page = req.query.page? Number(req.query.page) : 0;
   var order = req.query.order? req.query.order : 'ASC';
   if(page > offset){ offset = limit * page };
   if(!queryName){
       try {
            var dogsAPI = (await axios.get(`${process.env.URL_DOGS}?key=${process.env.API_KEY}`)).data;
            var countDB = await Dog.count();
            console.log(countDB);
            console.log(dogsAPI.length);
            if( countDB === 0) {
                console.log('entro a allCreates');
                await allCreate(dogsAPI);
            };
            
            var allDogs = await Dog.findAll({
                limit:limit,
                offset:offset,
                order:[["name",order]],
                attributes:{exclude : ["createdAt","updatedAt","dogApi"]},
                include:{
                    model:Temperament,
                    attributes:['id','name'],
                }
            });
            return res.json(allDogs);
                
        } catch(error){ console.error(error)};
    } else {
        try{
           var response = await getQueryName(queryName);
           res.json(response);
        } catch(error){ console.error(error)};
    };
};
 
// Get only dog by ID for params
                
export async function getDogById( req,res ){
    try{
        var paramID = req.params.id;
        var response = await Dog.findOne({
            where:{
                id:paramID
            },
            attributes:{exclude : ["createdAt","updatedAt","dogApi"]},
            include:{
                model:Temperament,
                attributes:['id','name'],
            }
        });
        return res.json(response);
    } catch(error){return res.send(error)};
};

// Get only dog created by user

export async function getOnlyCreate( req , res ){
    try{
        var dogCreated = await Dog.findAll({where:{
            dogApi: null,
        }});

        res.json(dogCreated);
    } catch(error){return console.error(error)};
};

// Get all dogs order by peso 

export async function getByPeso(req,res){
    try{
        var limit = 8;
        var offset = 0;
        var page = req.query.page? Number(req.query.page) : 0;
        var order = req.query.order? req.query.order : 'ASC';
        if(page > offset){ offset = limit * page };
        
        var dogsByPeso = await Dog.findAll({
            limit:limit,
            offset:offset,
            order:[["weight_min",order]],
            attributes:{exclude : ["createdAt","updatedAt","dogApi"]},
            include:{
                model:Temperament,
                attributes:['id','name'],
            }
        });

        res.json(dogsByPeso);
    } catch(error){return console.error(error)};
};
                
//------POST-----------------------------

// Create dogs

export async function createDog( req,res ){
    try{
        const { name,weight_min,weight_max,height,life,temperaments} = req.body;
        var dogCreate = await Dog.create({
                name,
                weight_min,
                weight_max,
                height,
                life,
                id:uuid()
        });
        
        for(var i in temperaments){
            var temp = await Temperament.findByPk(temperaments[i])
            await dogCreate.addTemperaments(temp);
        };
        var dogFind = await Dog.findOne({where:{name:name},include:Temperament})
        return res.json(dogFind);
    } catch(error){return res.send(error)}
};
                
            
        
            
            




            
               


