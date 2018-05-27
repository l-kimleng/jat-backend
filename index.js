
const express = require('express');
const app = express();
const config = require('config');
app.use(express.json());

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey variable not set.');
    process.exit(1);
}

require('./startup/routes')(app);
require('./startup/db')();

app.listen(3030, () => console.log('Server listen to port 3030...'));