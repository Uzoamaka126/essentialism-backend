const knex = require('knex');

const knexConfig = require('./knexfile');

const environment = process.env.DB_ENV || 'development';
const configOptions = knexConfig[environment];

module.exports = knex(configOptions);
