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
      responses.ok({ ...employeeData.rows[0], attendance: attendaces.rows }, res);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async getEmployeesAttendance(req, res) {
    const { today } = req.query;
    try {
      const { rows } = await db.query(today ? QUERIES.getTodayEmployeesAttendace : QUERIES.getEmployeesAttendace, []);
      responses.ok(rows, res);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async searchAttendancess(req, res) {
    try {
      const query = 'SELECT e.id, e.name, e.first_name, e.last_name, et.day as entry_date, et.hour as entry_hour, dt.day as departure_date, dt.hour as departure_hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE e.name LIKE $1 OR e.email LIKE $1';
      const { rows } = await db.query(query, [`${req.query.query}%`]);
      responses.ok(rows, res);
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
      responses.created(rows[0], res);
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
      responses.ok(rows[0], res);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }
}

module.exports = new AttendanceController();
