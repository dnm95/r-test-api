# Employees Entry/Departure API with Node.js, express and PostgreSQL

## Quick Start

1. Install all npm packages required by the project by running the command  ` npm install `.

2. Create you ` .env ` file, you can see an example on [.env.sample file](.env.sample).

3. Start the app by running the command ` npm start `.

## DB Initialization

1. Open a terminal or a DB manager for PostgreSQL.

2. Create a database.

3. Create a type for roles ` CREATE TYPE role AS ENUM ('admin', 'user'); `.

4. Create tables ` CREATE TABLE IF NOT EXISTS employees( id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, rfc VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(50) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, role role NOT NULL); ` `CREATE TABLE IF NOT EXISTS entry_time( id SERIAL PRIMARY KEY, day DATE NOT NULL, hour TIME NOT NULL, employee_id INTEGER NOT NULL, FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE);` `CREATE TABLE IF NOT EXISTS departure_time( id SERIAL PRIMARY KEY, day DATE NOT NULL, hour TIME NOT NULL, employee_id INTEGER NOT NULL, FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE);` . You can find all the queries that the API uses on [constants file](https://github.com/dnm95/r-test-api/blob/master/app/constants.js).

5. Create an employee with admin role using the POST [method](#add-employee)

## Login
* URL: /v1/login
* Authentication: None
* TYPE: POST

**Request:**
```
Content-Type: application/json
{
  email: test@test.com.mx,
  password: 1234,
}
```

## Get Employee
* URL: /v1/employee/:id
* Authentication: Token Based
* TYPE: GET

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
```

## Get Employees
* URL: /v1/employees
* Authentication: Token Based
* TYPE: GET

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
```

## Add Employee
* URL: /v1/employee
* Authentication: None
* TYPE: POST

**Request:**
```
Content-Type: application/json
{
  name: TEST,
  first_name: TEST,
  last_name: TEST,
  rfc: TEST1234,
  email: test@test.com.mx,
  password: 1234,
  role: user,
}
```

## Update Employee
* URL: /v1/employee/:id
* Authentication: Token Based
* TYPE: PUT

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
{
  name: TEST,
  first_name: TEST,
  last_name: TEST,
  rfc: TEST1234,
  email: test@test.com.mx,
}
```

## Delete Employees
* URL: /v1/employee/:id
* Authentication: Token Based
* TYPE: DELETE

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
```

## Get Employee Attendances
* URL: /v1/attendance/:id
* Authentication: Token Based
* TYPE: GET

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
```

## Get Employees Attendances
* URL: /v1/attendances
* Authentication: Token Based
* TYPE: GET

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
```

## Search Employee Attendances based on email or name
* URL: /v1/attendances/search?query=test
* Authentication: Token Based
* TYPE: GET

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
```

## Add Employee Attendance
* URL: /v1/attendance
* Authentication: Token Based
* TYPE: POST

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
{
  employee: 1,
  day: 2019-09-08,
  hour: 09:00,
  type: entry_time,
}
```

## Update Employee Attendance
* URL: /v1/attendance/:id
* Authentication: Token Based
* TYPE: PUT

**Request:**
```
Content-Type: application/json
Authorization: "eyJ0eXAiOiJK.OTk0ODk0MDAsImVtYWlsIjoi.2T8Pfy28yoF_nXvw"
{
  day: 2019-09-08,
  hour: 09:00,
  type: entry_time,
}
```