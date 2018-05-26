
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

app.listen(3030, () => console.log('Server listen to port 3030...'));