
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    city: {
        type: String,
        minlength: 5,
        maxlength: 225
    },
    state: {
        type: String,
        minlength: 2,
        maxlength: 225
    },
    zipCode: {
        type: Number
    }
});

module.exports.locationSchema = locationSchema;