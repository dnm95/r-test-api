const jwt = require('jwt-simple');
const moment = require('moment');

const secretKey = 'runa_test';

exports.ensureAuth = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(403).json({ message: 'Missing authentication header' });
  }

  const token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    const payload = jwt.decode(token, secretKey);

    if(payload.exp <= moment().unix()) {
      return res.status(401).json({ message: 'The token has expired' });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Invalid token' });
  }

  req.user = payload;
};
