import jwt from 'jsonwebtoken';
import User from '../models/User';
import keys from '../config/keys';
import { sendResetPasswordEmail } from '../utils/mailer';

exports.auth = (req, res, next) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.passsword)) {
      res.json({ user: { email: user.toAuthJSON() } });
    } else {
      res.status(400).json({ errors: { global: 'Invalid credentials' } });
    }
  });
};

exports.confirm = (req, res, next) => {
  const { token } = req.body;
  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: '', confirmed: true },
    { new: true }
  ).then(
    user =>
      user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
};

exports.passwordReset = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      res
        .status(400)
        .json({ errors: { global: 'There is no user with such email' } });
    }
  });
};

exports.validateToken = (req, res, next) => {
  jwt.verify(req.body.token, keys.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
};

exports.resetPassword = (req, res, next) => {
  const { password, token } = req.body.data;
  jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: 'Invalid token' } });
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res.status(404).json({ errors: { global: 'Invalid token' } });
        }
      });
    }
  });
};
