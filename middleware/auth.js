
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    try{
        const token = req.header('x-auth-token');
        if(!token) return res.status(401).send('Access denied. No token provided.');

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        if(!decoded) return res.status(400).send('Invalid token.');

        req.user = decoded;
        next();

    }catch(ex) {
        res.status(401).send('Access denied. invaild token.');
    }
}