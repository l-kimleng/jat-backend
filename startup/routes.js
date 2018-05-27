
const homeRoute = require('../routes/home');
const jobsRoute = require('../routes/jobs');
const usersRoute = require('../routes/users');

module.exports = function(app) {
   
    app.use('/', homeRoute);
    app.use('/api/jobs', jobsRoute);
    app.use('/api/register', usersRoute);
}