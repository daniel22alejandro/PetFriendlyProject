import PetsModel from '../models/PetsModel.js';
import { validationResult } from 'express-validator';
import multer from 'multer';
import mongoose from 'mongoose';



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })
export const cargarImagen = upload.single('photo')

export const createPet = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }



            let { name, race_id, category_id, gender_id } = req.body;
            let img = req.file.originalname

            const data = new PetsModel({
                name,
                race_id,
                category_id,
                photo: img, 
                gender_id

            });

            // Guardar la nueva mascota en la base de datos
            await data.save()
            res.status(200).json({ message: 'Mascota registrada con éxito'});
        }
    catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};




export const getPets = async (req, res) => {
    try {
        const pets = await PetsModel.find().populate('race_id').populate('category_id').populate('gender_id');
        if (pets.length > 0) {
            res.status(200).json(pets);
        } else {
            res.status(404).json({ message: 'No se encontraron mascotas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};


export const getPetById = async (req, res) => {
    try {
        const _id = req.params._id;
        const pet = await PetsModel.findById(_id).populate('race_id').populate('category_id').populate('gender_id');
        if (pet) {
            res.status(200).json(pet);
        } else {
            res.status(404).json({ message: 'La mascota no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

const cleanObjectKeys = (obj) => {
    const cleanedObj = {};
    for (const key in obj) {
        const cleanedKey = key.trim();
        cleanedObj[cleanedKey] = obj[key];
    }
    return cleanedObj;
};

export const updatePet = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);

        const { id } = req.params;
        const { name, race_id, category_id, gender_id } = cleanObjectKeys(req.body);

        let photo = '';
        if (req.file) {
            photo = req.file.filename;
        }

        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (race_id) updatedFields.race_id = race_id;
        if (category_id) updatedFields.category_id = category_id;
        if (photo) updatedFields.photo = photo;
        if (gender_id) updatedFields.gender_id = gender_id;

        console.log('updatedFields:', updatedFields);

        const result = await PetsModel.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

        if (result) {
            res.status(200).json({ message: 'Mascota actualizada con éxito', data: result });
        } else {
            res.status(404).json({ message: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la mascota: ' + error.message });
    }
};


export const deletePet = async (req, res) => {
    try {
        const deletedPet = await PetsModel.findByIdAndDelete(req.params._id);
        if (!deletedPet) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json({ message: 'Mascota eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};




