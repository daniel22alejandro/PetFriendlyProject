// src/models/GendersModel.js

import mongoose from "mongoose";

const Genders = new mongoose.Schema ({
    name_genders:{
        type: String,
        required: true,
        maxlength: 255
    }

})

const GendersModel = mongoose.model('genders', Genders);
export default GendersModel
