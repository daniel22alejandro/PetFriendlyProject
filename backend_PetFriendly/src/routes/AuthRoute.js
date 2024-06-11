import express from 'express';
import { loginUser } from '../controllers/AuthController.js';

const authRoutes = express.Router();

authRoutes.post('/login', loginUser);

export default authRoutes;
