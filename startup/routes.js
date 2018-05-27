
const homeRoute = require('../routes/home');
const jobsRoute = require('../routes/jobs');
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth');

module.exports = function(app) {
    app.use('/', homeRoute);
    app.use('/api/jobs', jobsRoute);
    app.use('/api/register', usersRoute);
    app.use('/api/login/', authRoute);
}