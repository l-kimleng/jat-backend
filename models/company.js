const mongoose = require('mongoose');
const {locationSchema} = require('./location');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 225,
    },
    location: {
        type: locationSchema,
        refs: "Location"
    }
});

module.exports.companySchema = companySchema;