require('dotenv').config();
const jwt = require('jwt-simple');
const moment = require('moment');

const secretKey = process.env.JWT_SECRET_KEY;

exports.createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix(),
  };
  return jwt.encode(payload, secretKey);
};
