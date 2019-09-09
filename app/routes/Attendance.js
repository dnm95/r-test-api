const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');
const mdAuth = require('../middlewares/authenticated');

const api = express.Router();

api.get('/attendance/:employeeId', mdAuth.ensureAuth, AttendanceController.getEmployeeAttendance);
api.get('/attendances', mdAuth.ensureAuth, AttendanceController.getEmployeesAttendance);
api.post('/attendance', mdAuth.ensureAuth, AttendanceController.addEmployeeAttendance);
api.put('/attendance/:id', mdAuth.ensureAuth, AttendanceController.updateEmployeeAttendance);

module.exports = api;
