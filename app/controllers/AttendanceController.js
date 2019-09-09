const responses = require('../helpers/responses');
const db = require('../services/db');

class AttendanceController {
  async getEmployeeAttendance(req, res) {
    const employeeId = parseInt(req.params.employeeId);
    const query = 'SELECT et.day, et.hour, dt.day, dt.hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE e.id = $1';
    try {
      const { rows } = await db.query(query, [employeeId]);
      res.status(200).json(rows);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async getEmployeesAttendance(req, res) {
    const query = 'SELECT e.name, e.first_name, e.last_name, et.day, et.hour, dt.day, dt.hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE et.day = current_date AND dt.day = current_date';
    try {
      const { rows } = await db.query(query, []);
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

    const query = `INSERT INTO ${type} (day, hour, employee_id) VALUES ($1, $2, $3) RETURNING employee_id`;
    try {
      const { rows } = await db.query(query, [day, hour, employee]);
      res.status(201).json(rows[0]);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }

  async updateEmployeeAttendance(req, res) {
    const id = parseInt(req.params.id);
    const { day, hour, type } = req.body;

    const query = `UPDATE ${type} SET day = $1, hour = $2 WHERE id = $3 RETURNING employee_id`;
    try {
      const { rows } = await db.query(query, [day, hour, id]);
      res.status(200).json(rows[0]);
    } catch (error) {
      responses.internal_server_error(res);
      console.log(error);
    }
  }
}

module.exports = new AttendanceController();
