
const homeRoute = require('../routes/home');
const jobsRoute = require('../routes/jobs');

module.exports = function(app) {
   
    app.use('/', homeRoute);
    app.use('/api/jobs', jobsRoute);
}