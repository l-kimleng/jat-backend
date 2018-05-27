
const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await createUser(req.body);
        const token = user.generateToken();

        return res.header('x-auth-token', token)
            .send(_.pick(user, ['_id', 'name', 'email']));
    }catch(ex) {
        res.status(500).send(ex.message);
    }
});

async function createUser(user) {
    const salt = 10;
    const hashed = await bcrypt.hash(user.password, salt);
    
    const newUser = new User({
        name: user.name,
        email: user.email,
        password: hashed
    });

    return await newUser.save();
}

module.exports = router;