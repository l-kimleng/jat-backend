
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

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

userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

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