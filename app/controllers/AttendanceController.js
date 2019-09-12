/* eslint-disable radix */
const responses = require('../helpers/responses');
const db = require('../services/db');
const { QUERIES } = require('../constants');

class AttendanceController {
  async getEmployeeAttendance(req, res) {
    const employeeId = parseInt(req.params.id);

    try {
      const employeeData = await db.query(QUERIES.getEmployeeById, [employeeId]);
      const attendaces = await db.query(QUERIES.getEmployeeAttendance, [employeeId]);
      res.status(200).json({ ...employeeData.rows[0], attendance: attendaces.rows });
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async getEmployeesAttendance(req, res) {
    try {
      const { rows } = await db.query(QUERIES.getEmployeesAttendace, []);
      res.status(200).json(rows);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async searchAttendancess(req, res) {
    try {
      const query = 'SELECT e.id, e.name, e.first_name, e.last_name, et.day as entry_date, et.hour as entry_hour, dt.day as departure_date, dt.hour as departure_hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE e.name LIKE $1 OR e.email LIKE $1';
      const { rows } = await db.query(query, [`${req.query.query}%`]);
      res.status(200).json(rows);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async addEmployeeAttendance(req, res) {
    const {
      employee, day, hour, type,
    } = req.body;

    try {
      const { rows } = await db.query(QUERIES.insertEmployeeAttendance(type), [day, hour, employee]);
      res.status(201).json(rows[0]);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async updateEmployeeAttendance(req, res) {
    const id = parseInt(req.params.id);
    const { day, hour, type } = req.body;

    try {
      const { rows } = await db.query(QUERIES.updateEmployeeAttendance(type), [day, hour, id]);
      res.status(200).json(rows[0]);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }
}

module.exports = new AttendanceController();
