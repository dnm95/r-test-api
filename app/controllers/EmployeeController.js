const bcrypt = require('bcrypt');
const responses = require('../helpers/responses');
const jwt = require('../services/jwt');
const db = require('../services/db');
const { QUERIES } = require('../constants');

class EmployeeController {
  async getEmployeeById(req, res) {
    const employeeId = parseInt(req.params.id);

    try {
      const { rows } = await db.query(QUERIES.getEmployeeById, [employeeId]);
      res.status(200).json(rows[0]);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async saveEmployee(req, res) {
    const {
      name, firstName, lastName, rfc, email, password, role,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
      const { rows } = await db.query(QUERIES.insertEmployee, [name, firstName, lastName, rfc, email, hash, role]);
      res.status(201).json(rows[0]);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const { rows } = await db.query(QUERIES.login, [email]);
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
            id: rows[0].id,
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
