const express = require('express');
const api = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

api.post('/employee', EmployeeController.saveEmployee);
api.post('/login', EmployeeController.login);

module.exports = api;
