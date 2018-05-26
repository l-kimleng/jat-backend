
const homeRoute = require('../routes/home');

module.exports = function(app) {
    app.use('/', homeRoute);
}