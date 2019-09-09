const QUERIES = {
  createEmployeesTable: `CREATE TYPE role AS ENUM ('admin', 'user');
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
      )`,
  createEntryTimeTable: `CREATE TABLE IF NOT EXISTS
  entry_time(
    id SERIAL PRIMARY KEY,
    day DATE NOT NULL,
    hour TIME NOT NULL,
    employee_id INTEGER NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  createDepartureTimeTable: `CREATE TABLE IF NOT EXISTS
  departure_time(
    id SERIAL PRIMARY KEY,
    day DATE NOT NULL,
    hour TIME NOT NULL,
    employee_id INTEGER NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  dropEmployeesTable: 'DROP TABLE IF EXISTS employees',
  dropEntryTimeTable: 'DROP TABLE IF EXISTS entry_time',
  dropDepartureTimeTable: 'DROP TABLE IF EXISTS departure_time',
  insertEmployee: 'INSERT INTO employees (name, first_name, last_name, rfc, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING email',
  login: 'SELECT * from employees e WHERE email = $1',
  getEmployeeAttendance: 'SELECT et.day, et.hour, dt.day, dt.hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE e.id = $1',
  getEmployeesAttendace: 'SELECT e.name, e.first_name, e.last_name, et.day, et.hour, dt.day, dt.hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE et.day = current_date AND dt.day = current_date',
  insertEmployeeAttendance: (type) => `INSERT INTO ${type} (day, hour, employee_id) VALUES ($1, $2, $3) RETURNING employee_id`,
  updateEmployeeAttendance: (type) => `UPDATE ${type} SET day = $1, hour = $2 WHERE id = $3 RETURNING employee_id`,
};

module.exports = {
  QUERIES,
};
