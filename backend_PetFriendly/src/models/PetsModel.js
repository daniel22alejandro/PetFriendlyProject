// src/models/PetsModel.js

import mongoose from "mongoose";

const Pets = new mongoose.Schema ({
    name:{
        type: String,
        required: true,
        maxlength: 255
    },
    race_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'races',
        required: true,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    photo:{
        type: String,
        maxlength: 64
    },
    gender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genders',
        required: true,
    },
})

const PetsModel = mongoose.model('pets', Pets);
export default PetsModel
