import { Dog } from '../models/Dog.js';
import { Temperament } from '../models/Temperament.js';
import  axios from'axios';
const { URL_DOGS,API_KEY} = process.env;
import { allCreate } from './functions.js';
import { Op } from "sequelize";


export async function getAllTemperaments (req,res){
    try{
        var dogsAPI = (await axios.get(`${URL_DOGS}?key=${API_KEY}`)).data; 
        var count = await Temperament.count();
        if(count === 0 ){
            await allCreate(dogsAPI);
        };
        var allTemperaments = await Temperament.findAll({attributes:["id","name"],order:[["name","ASC"]]});
        return res.json(allTemperaments);
        
    } catch(error){return res.send(error)};
};

export async function getDogsByTemp(req,res){
    var temp = req.params.temperament;
    var response = await Temperament.findAll({
        where:{
            name:{[Op.iLike]:`%${temp}%`}},
            attributes:{exclude : ["id","name","createdAt","updatedAt"]},
            include:{
                model:Dog,
                attributes:{exclude : ["createdAt","updatedAt","dogApi"]},
                include:Temperament,
            }
        });
    res.json(response);
};
