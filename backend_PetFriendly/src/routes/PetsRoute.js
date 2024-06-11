import express from 'express';
import { createPet, getPets, getPetById, updatePet, deletePet, cargarImagen } from '../controllers/PetsController.js';
import { authenticateToken } from '../controllers/AuthController.js';

const petRoutes = express.Router();

petRoutes.post('/registrar',authenticateToken,cargarImagen, createPet);
petRoutes.get('/listar', authenticateToken, getPets);
petRoutes.get('/listarId/:_id', authenticateToken, getPetById);
petRoutes.put('/actualizar/:id',authenticateToken, cargarImagen, updatePet);
petRoutes.delete('/eliminar/:_id', authenticateToken, deletePet);

export default petRoutes;
