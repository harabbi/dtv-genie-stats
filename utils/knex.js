require('dotenv').config();

const connection = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const knex = require('knex')({
  client: 'pg',
  connection,
  pool: { min: 0, max: 15 },
});

module.exports = knex;
