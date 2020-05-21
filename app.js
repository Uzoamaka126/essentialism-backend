const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
routes(app);

module.exports = app;