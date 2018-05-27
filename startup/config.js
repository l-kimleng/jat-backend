
const config = require('config');

module.exports = function() {
    if(!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtPrivateKey variable not set.');
        process.exit(1);
    }
}