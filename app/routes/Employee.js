const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');
const api = express.Router();

api.post('/employee', EmployeeController.saveEmployee);
api.post('/login', EmployeeController.login);

module.exports = api;
