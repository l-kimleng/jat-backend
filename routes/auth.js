
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send('Invaild email or password.');

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invaild email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invaild email or password.');

    const token = user.generateToken();
    res.header('x-auth-token', token).send({email: user.email});
});

function validate(req) {
    const schema = {
        email: Joi.string().email(),
        password: Joi.string().min(5).max(225)
    };
    return Joi.validate(req, schema);
}

module.exports = router;