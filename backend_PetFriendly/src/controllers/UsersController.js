import bcrypt from 'bcryptjs';
import UserModel from '../models/UsersModel.js';
import { generateToken } from './AuthController.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new UserModel({
            fullname,
            email,
            password: hashedPassword
        });

        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();

        // Devolver la respuesta con el usuario y el ¿token?
        res.status(200).json({ message: 'Usuario registrado con éxito', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No se encontraron usuarios' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const _id = req.params._id;
        const user = await UserModel.findById(_id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'El usuario no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (updatedUser) {
            return res.status(201).json({ message: 'Usuario actualizado', updatedUser });
        }
        res.status(404).json({ message: 'El usuario no encontrado' });
    } catch (error) {
        res.status(400).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params._id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};
