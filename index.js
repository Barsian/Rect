require("dotenv").config({ path: "./config/.env" });
const logger = require('./startup/logging');
const express = require('express')
const app = express();
const server = require('http').createServer(app);
require('./startup/routes')(app);

app.listen(process.env.PORT, () => {
  logger.info(`App listening on port ${process.env.PORT}!`)
});

