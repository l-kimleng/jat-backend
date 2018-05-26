
const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 225
    },
    phone: String,
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225
    },
    company: String
});

module.exports.recruiterSchema = recruiterSchema;