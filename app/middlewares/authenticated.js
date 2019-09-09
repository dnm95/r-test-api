require('dotenv').config();
const jwt = require('jwt-simple');
const moment = require('moment');

const secretKey = process.env.JWT_SECRET_KEY;

// eslint-disable-next-line consistent-return
exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Missing authentication header' });
  }

  const token = req.headers.authorization.replace(/['"]+/g, '');
  let payload;

  try {
    payload = jwt.decode(token, secretKey);

    if (payload.exp <= moment().unix()) {
      return res.status(401).json({ message: 'The token has expired' });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Invalid token' });
  }

  req.user = payload;
  next();
};
