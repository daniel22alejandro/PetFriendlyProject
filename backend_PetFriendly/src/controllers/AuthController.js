import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import UserModel from '../models/UsersModel.js';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

// Función para generar un token JWT
export const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, secretKey, { expiresIn: '24h' });
};

// Función para validar un token JWT con una cabecera personalizada
export const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const decodedToken = jwt.verify(token, secretKey);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};


// Función para iniciar sesión
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Generar un token JWT para el usuario
        const token = generateToken(user._id, user.email);

        // Devolver la respuesta con el token
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};
