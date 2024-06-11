// src/models/CategoriesModel.js

import mongoose from "mongoose";

const Categories = new mongoose.Schema ({
    name_categories:{
        type: String,
        required: true,
        maxlength: 255
    }

})

const CategoriesModel = mongoose.model('categories', Categories);
export default CategoriesModel
