require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

exports.query = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});
