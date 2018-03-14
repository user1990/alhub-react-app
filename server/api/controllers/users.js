import jwt from 'jsonwebtoken';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../utils/mailer';

exports.signup = (req, res, next) => {
  const { email, password } = req.body.user;
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.sendConfirmationToken();
  newUser
    .save()
    .then(user => {
      sendConfirmationEmail(user);
      res.json({ user: user.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
};
