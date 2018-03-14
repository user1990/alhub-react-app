import jwt from 'jsonwebtoken';
import User from '../models/User';
import keys from '../config/keys';

export default (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  /* eslint-disable prefer-destructuring */
  if (header) token = header.split(' ')[1];

  if (token) {
    jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: 'Invalid token' } });
      } else {
        User.findOne({ email: decoded.email }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: { global: 'No token' } });
  }
};
