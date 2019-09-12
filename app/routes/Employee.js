const express = require('express');
const api = express.Router();
const mdAuth = require('../middlewares/authenticated');
const EmployeeController = require('../controllers/EmployeeController');

api.get('/employee/:id', mdAuth.ensureAuth, EmployeeController.getEmployeeById);
api.get('/employees', mdAuth.ensureAuth, EmployeeController.getEmployees);
api.post('/employee', mdAuth.ensureAuth, EmployeeController.saveEmployee);
api.put('/employee/:id', mdAuth.ensureAuth, EmployeeController.updateEmployee);
api.delete('/employee/:id', mdAuth.ensureAuth, EmployeeController.deleteEmployee);
api.post('/login', EmployeeController.login);

module.exports = api;
