const Pool = require('pg').Pool;
const responses = require('../helpers/responses');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'runa_test',
  password: 'password',
  port: 5432,
});

class EmployeeController {

  saveEmployee(req, res) {
    const { name, firstName, lastName, rfc, email, password, role } = req.body;

    const query = `INSERT INTO employees (name, first_name, last_name, rfc, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING email`;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        responses.internal_server_error(res);
        throw error;
      }
      pool.query(query, [name, firstName, lastName, rfc, email, hash, role], (error, result) => {
        if (error) {
          responses.internal_server_error(res);
          throw error;
        }
        res.status(201).json(result.rows[0]);
      });
    });
  }

  login(req, res) {
    const { email, password } = req.body;

    const query = `SELECT * from employees WHERE email = $1`;
    pool.query(query, [email], (error, results) => {
      if (error) {
        responses.internal_server_error(res);
        throw error;
      }
      bcrypt.compare(password, results.rows[0].password, (err, check) => {
        if (err) {
          responses.internal_server_error(res);
          throw error;
        }
        if (check) {
          // MIGRAR ROL DE USARIO A TABLA DE EMPLEADOS, PARA PODER INTEGRAR JWT
          res.status(200).json(results.rows[0]);
        } else {
          res.status(404).json({ message: 'Usuario o contraseña incorrecta' });
        }
      });
    });
  }

}

module.exports = new EmployeeController();
