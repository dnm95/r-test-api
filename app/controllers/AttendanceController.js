const Pool = require('pg').Pool;
const responses = require('../helpers/responses');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'runa_test',
  password: 'password',
  port: 5432,
});

class AttendanceController {

  getEmployeeAttendance(req, res) {
    const employeeId = parseInt(req.params.employeeId);
    const query = 'SELECT et.day, et.hour, dt.day, dt.hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE e.id = $1';
    pool.query(query, [employeeId], (error, results) => {
      if (error) {
        responses.internal_server_error(res);
        throw error;
      }
      res.status(200).json(results.rows)
      // responses.ok(scores, res);
    })
  }

  getEmployeesAttendance(req, res) {
    const query = 'SELECT e.name, e.first_name, e.last_name, et.day, et.hour, dt.day, dt.hour FROM employees e INNER JOIN entry_time et ON e.id = et.employee_id LEFT JOIN departure_time dt ON e.id = dt.employee_id AND et.day = dt.day WHERE et.day = current_date AND dt.day = current_date';
    pool.query(query, (error, results) => {
      if (error) {
        responses.internal_server_error(res);
        throw error;
      }
      res.status(200).json(results.rows)
      // responses.ok(scores, res);
    })
  }

  addEmployeeAttendance(req, res) {
    const { employee, day, hour, type } = req.body;

    const query = `INSERT INTO ${type} (day, hour, employee_id) VALUES ($1, $2, $3)`;
    pool.query(query, [day, hour, employee], (error, result) => {
      if (error) {
        responses.internal_server_error(res);
        throw error;
      }
      console.log(result);
      res.status(201).send(`Attendance added for employee: ${employee}`);
    });
  }

    updateEmployeeAttendance(req, res) {
      const id = parseInt(req.params.id)
      const { day, hour, type } = req.body
      const query = `UPDATE ${type} SET day = $1, hour = $2 WHERE id = $3`;

      pool.query(
        query,
        [day, hour, id],
        (error) => {
          if (error) {
            responses.internal_server_error(res);
            throw error;
          }
          res.status(200).send(`Attendance modified id: ${id}`)
        }
      );
    }

}

module.exports = new AttendanceController();
