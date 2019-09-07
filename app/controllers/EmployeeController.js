const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'runa-test',
  password: 'password',
  port: 5432,
});

class EmployeeController {

}

module.exports = new EmployeeController();
