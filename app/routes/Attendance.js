const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');
const api = express.Router();

api.get('/attendance/:employeeId', AttendanceController.getEmployeeAttendance);
api.get('/attendances', AttendanceController.getEmployeesAttendance);
api.post('/attendance', AttendanceController.addEmployeeAttendance);
api.put('/attendance/:id', AttendanceController.updateEmployeeAttendance);

module.exports = api;
