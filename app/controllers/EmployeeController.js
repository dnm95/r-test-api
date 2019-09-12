/* eslint-disable camelcase */
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
      responses.ok(rows[0], res);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async getEmployees(req, res) {
    try {
      const { rows } = await db.query(QUERIES.getEmployees, []);
      responses.ok(rows, res);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async saveEmployee(req, res) {
    const {
      name, first_name, last_name, rfc, email, password, role,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
      const { rows } = await db.query(QUERIES.insertEmployee, [name, first_name, last_name, rfc, email, hash, role]);
      responses.created(rows[0], res);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async updateEmployee(req, res) {
    const id = parseInt(req.params.id);
    const {
      name, first_name, last_name, rfc, email,
    } = req.body;

    try {
      const { rows } = await db.query(QUERIES.updateEmployee, [name, first_name, last_name, rfc, email, id]);
      responses.created(rows[0], res);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async deleteEmployee(req, res) {
    const id = parseInt(req.params.id);

    try {
      const { rows } = await db.query(QUERIES.deleteEmployee, [id]);
      responses.ok(rows[0], res);
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
          responses.ok({
            token: jwt.createToken(rows[0]),
            email: rows[0].email,
            role: rows[0].role,
            id: rows[0].id,
          }, res);
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
