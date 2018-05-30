
const express = require('express');
const cors = require('./middleware/cors');
const app = express();
app.use(express.json());
app.use(cors);

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3030;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = server;