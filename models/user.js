
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,        
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1000
    }
});

const User = mongoose.model('User', userSchema);

function validate(user) {
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().email(),
        password: Joi.string().min(5).max(225)
    };
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validate;