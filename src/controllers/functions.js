import { raw } from 'express';
import { Dog } from '../models/Dog.js';
import { Temperament } from '../models/Temperament.js';
import { Op } from "sequelize";



export async function getQueryName(query) {
    console.log(query.name);
    var response = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${query}%`
            },
        },
        include: {
            model: Temperament,
            attributes: ["id", "name"],
        },
        attributes: { exclude: ["createdAt", "updatedAt", "dogApi"] },
    });
    return response;
};



function stringArray(string) {
    return string.split(',');
};

function selectMin(string) {
    var min = string.split('-');
    return min[0] && !isNaN(min[0]) ? parseInt(min[0]) : 0;
};

function selectMax(string) {
    var min = string.split('-');
    return min[1] && !isNaN(min[1]) ? parseInt(min[1]) : 0;
};

export async function allCreate(dogsArray) {
    if (!Array.isArray(dogsArray) || dogsArray.length === 0) {
        console.error('Invalid input: expected non-empty array');
        return [];
    }

    try {

        const createdDogs = [];

        for (const dogData of dogsArray) {
            try {
                const dog = await Dog.create({
                    id: dogData.id,
                    name: dogData.name,
                    life: dogData.life_span || 'Unknown',
                    weight_min: dogData.weight?.metric ? selectMin(dogData.weight.metric) : 0,
                    weight_max: dogData.weight?.metric ? selectMax(dogData.weight.metric) : 0,
                    height: dogData.height?.metric || 'Unknown',
                    image: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}_1280.jpg`,
                    dogApi: dogData.temperament ? stringArray(dogData.temperament) : ['Empty'],
                });
                await setRelation(dog.name);
                createdDogs.push(dog);
            } catch (error) {
                console.error(`Erro ao criar cão ${dogData.name}:`, error.message);
            };
        };
        console.log(`Concluído! ${createdDogs.length} cães criados com sucesso`);
        return createdDogs;
    } catch (error) {
        console.error('Erro crítico em allCreate:', error);
        throw error;
    }
};






export async function setRelation(name) {
    try {
        var dog = await Dog.findOne({
            where: {
                name: name,
            },
        });
        for (var i in dog.dogApi) {
            await Temperament.findOrCreate({ where: { name: dog.dogApi[i] } });
            if (dog.dogApi[i] !== undefined || dog.dogApi[i] !== null) {
                var temperament = await Temperament.findOne({ where: { name: dog.dogApi[i] } });
                await temperament.addDogs(dog);
            };
        };
    } catch (error) { return console.error(error) };
};               
