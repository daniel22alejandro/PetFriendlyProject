// src/controllers/GendersController.js
import GendersModel from '../models/GendersModel.js';

// Crear un nuevo género
export const createGender = async (req, res) => {
    try {
        const { name_genders } = req.body;

        // Crear un nuevo género utilizando el modelo GendersModel
        const newGender = new GendersModel({ name_genders });

        // Guardar el nuevo género en la base de datos
        const savedGender = await newGender.save();

        res.status(200).json({ message: 'Género registrado con éxito', gender: savedGender });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar todos los géneros
export const getGenders = async (req, res) => {
    try {
        const genders = await GendersModel.find();
        if (genders.length > 0) {
            res.status(200).json(genders);
        } else {
            res.status(404).json({ message: 'No se encontraron géneros' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar un género por ID
export const getGenderById = async (req, res) => {
    try {
        const _id = req.params._id;
        const gender = await GendersModel.findById(_id);
        if (gender) {
            res.status(200).json(gender);
        } else {
            res.status(404).json({ message: 'El género no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Actualizar un género por ID
export const updateGender = async (req, res) => {
    try {
        const updatedGender = await GendersModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (updatedGender) {
            return res.status(201).json({ message: 'Género actualizado', updatedGender });
        }
        res.status(404).json({ message: 'Género no encontrado' });
    } catch (error) {
        res.status(400).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Eliminar un género por ID
export const deleteGender = async (req, res) => {
    try {
        const deletedGender = await GendersModel.findByIdAndDelete(req.params._id);
        if (!deletedGender) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }
        res.status(200).json({ message: 'Género eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};
