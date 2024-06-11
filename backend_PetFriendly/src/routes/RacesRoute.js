// src/routes/RacesRoute.js
import express from 'express';
import { createRace, getRaces, getRaceById, updateRace, deleteRace } from '../controllers/RacesController.js';
import { authenticateToken } from '../controllers/AuthController.js';

const raceRoutes = express.Router();

raceRoutes.post('/registrar', authenticateToken,createRace);
raceRoutes.get('/listar', authenticateToken,getRaces);
raceRoutes.get('/listarId/:_id', authenticateToken, getRaceById);
raceRoutes.put('/actualizar/:_id', authenticateToken, updateRace);
raceRoutes.delete('/eliminar/:_id', authenticateToken, deleteRace);

export default raceRoutes;
