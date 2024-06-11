// src/controllers/CategoriesController.js
import CategoriesModel from '../models/CategoriesModel.js';

// Crear una nueva categoría
export const createCategory = async (req, res) => {
    try {
        const { name_categories } = req.body;

        // Crear una nueva categoría utilizando el modelo CategoriesModel
        const newCategory = new CategoriesModel({ name_categories });

        // Guardar la nueva categoría en la base de datos
        const savedCategory = await newCategory.save();

        res.status(200).json({ message: 'Categoría registrada con éxito', category: savedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar todas las categorías
export const getCategories = async (req, res) => {
    try {
        const categories = await CategoriesModel.find();
        if (categories.length > 0) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ message: 'No se encontraron categorías' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Listar una categoría por ID
export const getCategoryById = async (req, res) => {
    try {
        const _id = req.params._id;
        const category = await CategoriesModel.findById(_id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'La categoría no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Actualizar una categoría por ID
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await CategoriesModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (updatedCategory) {
            return res.status(201).json({ message: 'Categoría actualizada', updatedCategory });
        }
        res.status(404).json({ message: 'Categoría no encontrada' });
    } catch (error) {
        res.status(400).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// Eliminar una categoría por ID
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await CategoriesModel.findByIdAndDelete(req.params._id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};
