import { Router } from 'express';
import { getAllDogs,getDogById,createDog,getOnlyCreate,getByPeso,testApi } from '../controllers/dog.js'
import { getAllTemperaments,getDogsByTemp } from '../controllers/temperament.js';
const router = Router();

router.get('/dogs',getAllDogs);
router.get('/dogs/:id',getDogById);
router.get('/dogs/temperaments/:temperament',getDogsByTemp);
router.get('/dogs/get/created',getOnlyCreate);
router.get('/temperaments',getAllTemperaments);
router.get('/dogs/order/peso',getByPeso);
router.post('/dogs',createDog);

export default router;
