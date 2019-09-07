// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/*
  Create Employees Table
*/
const createEmployeesTable = () => {
  const query =
    `CREATE TABLE IF NOT EXISTS
      employees(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        rfc VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE
      )`;

  pool.query(query)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
}

/*
  Create Roles Table
*/
const createRolesTable = () => {
  const query =
  `CREATE TYPE IF NOT EXISTS role AS ENUM ('admin', 'user');
  CREATE TABLE IF NOT EXISTS
    roles(
      id SERIAL PRIMARY KEY,
      type role,
      employee_id INTEGER NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;

  pool.query(query)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
};

/*
  Create Schedules Table
*/
const createSchedulesTable = () => {
  const query =
  `CREATE TABLE IF NOT EXISTS
    schedules(
      id SERIAL PRIMARY KEY,
      day DATE NOT NULL,
      entry_time TIME NOT NULL,
      departure_time TIME NOT NULL,
      employee_id INTEGER NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;

  pool.query(query)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
};

/**
 * Drop Employees Table
 */
const dropEmployeesTable = () => {
  const query = 'DROP TABLE IF EXISTS employees returning *';
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Roles Table
 */
const dropRolesTable = () => {
  const query = 'DROP TABLE IF EXISTS roles returning *';
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Schedules Table
 */
const dropSchedulesTable = () => {
  const query = 'DROP TABLE IF EXISTS schedules returning *';
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createEmployeesTable,
  createRolesTable,
  createSchedulesTable,
  dropEmployeesTable,
  dropRolesTable,
  dropSchedulesTable,
};

require('make-runnable');
