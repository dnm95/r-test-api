const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'runa_test',
  password: 'password',
  port: 5432,
});

/*
  Create Employees Table
*/
const createEmployeesTable = () => {
  const query =
    `CREATE TYPE role AS ENUM ('admin', 'user');
    CREATE TABLE IF NOT EXISTS
      employees(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        rfc VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role role NOT NULL
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
  Create entry time Table
*/
const createEntryTime = () => {
  const query =
  `CREATE TABLE IF NOT EXISTS
    entry_time(
      id SERIAL PRIMARY KEY,
      day DATE NOT NULL,
      hour TIME NOT NULL,
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
  Create departure time Table
*/

const createDepartureTime = () => {
  const query =
  `CREATE TABLE IF NOT EXISTS
    departure_time(
      id SERIAL PRIMARY KEY,
      day DATE NOT NULL,
      hour TIME NOT NULL,
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
  const query = 'DROP TABLE IF EXISTS employees';
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
 * Drop entry time Table
 */
const dropEntryTimeTable = () => {
  const query = 'DROP TABLE IF EXISTS entry_time';
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
 * Drop departure time Table
 */
const dropDepartureTimeTable = () => {
  const query = 'DROP TABLE IF EXISTS departure_time';
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
  createEntryTime,
  createDepartureTime,
  dropEmployeesTable,
  dropEntryTimeTable,
  dropDepartureTimeTable,
};
