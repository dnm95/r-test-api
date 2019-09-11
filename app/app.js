const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const attendanceRoutes = require('./routes/Attendance');
const employeeRoutes = require('./routes/Employee');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Allow', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/v1', attendanceRoutes);
app.use('/v1', employeeRoutes);

app.use((req, res) => {
  res.status(200).send({ message: 'Server ok' });
});

module.exports = app;
