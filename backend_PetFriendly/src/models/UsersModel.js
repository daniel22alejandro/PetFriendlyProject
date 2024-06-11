// src/models/UsersModel.js

import mongoose from "mongoose";

const User = new mongoose.Schema ({
    fullname:{
        type: String,
        required: true,
        maxlength: 255
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        maxlength: 255
    }
})

const UserModel = mongoose.model('users', User);
export default UserModel
