const express = require('express');
const api = express.Router();
const mdAuth = require('../middlewares/authenticated');
const EmployeeController = require('../controllers/EmployeeController');

api.get('/employee/:id', mdAuth.ensureAuth, EmployeeController.getEmployeeById);
api.post('/employee', EmployeeController.saveEmployee);
api.post('/login', EmployeeController.login);

module.exports = api;
