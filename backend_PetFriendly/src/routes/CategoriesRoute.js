// src/routes/CategoriesRoute.js
import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/CategoriesController.js';
import { authenticateToken } from '../controllers/AuthController.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/registrar', authenticateToken, createCategory);
categoryRoutes.get('/listar', authenticateToken,getCategories);
categoryRoutes.get('/listarId/:_id', authenticateToken,getCategoryById);
categoryRoutes.put('/actualizar/:_id', authenticateToken, updateCategory);
categoryRoutes.delete('/eliminar/:_id', authenticateToken, deleteCategory);

export default categoryRoutes;
