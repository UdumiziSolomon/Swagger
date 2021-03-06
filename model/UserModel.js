    'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose ;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true});

const User = mongoose.model('UserSwagger', UserSchema);
module.exports = User ;