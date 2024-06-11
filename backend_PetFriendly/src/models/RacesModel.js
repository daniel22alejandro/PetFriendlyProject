// src/models/RacesModel.js

import mongoose from "mongoose";

const Races = new mongoose.Schema ({
    name_races:{
        type: String,
        required: true,
        maxlength: 255
    }

})

const RacesModel = mongoose.model('races', Races);
export default RacesModel
