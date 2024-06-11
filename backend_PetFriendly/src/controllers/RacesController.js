// src/controllers/RacesController.js
import RacesModel from '../models/RacesModel.js';

// Crear una nueva raza
export const createRace = async (req, res) => {
    try {
        const { name_races } = req.body;

        // Crear una nueva raza utilizando el modelo RacesModel
        const newRace = new RacesModel({ name_races });

        // Guardar la nueva raza en la base de datos
        const savedRace = await newRace.save();

        res.status(200).json({ message: 'Raza registrada con éxito', race: savedRace });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar todas las razas
export const getRaces = async (req, res) => {
    try {
        const races = await RacesModel.find();
        if (races.length > 0) {
            res.status(200).json(races);
        } else {
            res.status(404).json({ message: 'No se encontraron razas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar una raza por ID
export const getRaceById = async (req, res) => {
    try {
        const _id = req.params._id;
        const race = await RacesModel.findById(_id);
        if (race) {
            res.status(200).json(race);
        } else {
            res.status(404).json({ message: 'La raza no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Actualizar una raza por ID
export const updateRace = async (req, res) => {
    try {
        const updatedRace = await RacesModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (updatedRace) {
            return res.status(201).json({ message: 'Raza actualizada', updatedRace });
        }
        res.status(404).json({ message: 'Raza no encontrada' });
    } catch (error) {
        res.status(400).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Eliminar una raza por ID
export const deleteRace = async (req, res) => {
    try {
        const deletedRace = await RacesModel.findByIdAndDelete(req.params._id);
        if (!deletedRace) {
            return res.status(404).json({ message: 'Raza no encontrada' });
        }
        res.status(200).json({ message: 'Raza eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};
