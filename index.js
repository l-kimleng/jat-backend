
const express = require('express');
const app = express();
app.use(express.json());

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

app.listen(3030, () => console.log('Server listen to port 3030...'));