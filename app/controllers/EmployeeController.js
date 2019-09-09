const bcrypt = require('bcrypt');
const responses = require('../helpers/responses');
const jwt = require('../services/jwt');
const db = require('../services/db');

class EmployeeController {
  async saveEmployee(req, res) {
    const {
      name, firstName, lastName, rfc, email, password, role,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO employees (name, first_name, last_name, rfc, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING email';

    try {
      const { rows } = await db.query(query, [name, firstName, lastName, rfc, email, hash, role]);
      res.status(201).json(rows[0]);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const query = 'SELECT * from employees e WHERE email = $1';
    try {
      const { rows } = await db.query(query, [email]);
      bcrypt.compare(password, rows[0].password, (err, check) => {
        if (err) {
          responses.internal_server_error(res);
          throw err;
        }
        if (check) {
          res.status(200).json({
            token: jwt.createToken(rows[0]),
            email: rows[0].email,
            role: rows[0].role,
          });
        } else {
          res.status(404).json({ message: 'Usuario o contraseña incorrecta' });
        }
      });
    } catch (err) {
      responses.internal_server_error(res);
      console.log(err);
    }
  }
}

module.exports = new EmployeeController();
