import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UsersController.js';
import { authenticateToken } from '../controllers/AuthController.js';

const userRoutes = express.Router();

userRoutes.post('/registrar', createUser);
userRoutes.get('/listar', authenticateToken, getUsers);
userRoutes.get('/listarId/:_id', authenticateToken, getUserById);
userRoutes.put('/actualizar/:_id', authenticateToken, updateUser);
userRoutes.delete('/eliminar/:_id', authenticateToken,deleteUser);

export default userRoutes;
