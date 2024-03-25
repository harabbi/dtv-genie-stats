require('dotenv').config();

const connection = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

module.exports = {
  client: 'pg',
  connection,
};
