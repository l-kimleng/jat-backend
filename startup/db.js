
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.connect(config.get('dbConnectionString'))
        .then(() => console.log('Connected to MongoDB.'))
        .catch(ex => console.error('Something went wrong.', ex));
}