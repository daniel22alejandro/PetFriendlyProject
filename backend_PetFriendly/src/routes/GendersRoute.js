// src/routes/GendersRoute.js
import express from 'express';
import { createGender, getGenders, getGenderById, updateGender, deleteGender } from '../controllers/GendersController.js';
import { authenticateToken } from '../controllers/AuthController.js';

const genderRoutes = express.Router();

genderRoutes.post('/registrar', authenticateToken,createGender);
genderRoutes.get('/listar', authenticateToken,getGenders);
genderRoutes.get('/listarId/:_id',authenticateToken, getGenderById);
genderRoutes.put('/actualizar/:_id', authenticateToken,updateGender);
genderRoutes.delete('/eliminar/:_id', authenticateToken, deleteGender);

export default genderRoutes;
