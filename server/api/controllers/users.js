import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../utils/mailer';

exports.signup = (req, res, next) => {
  const { email, password, username } = req.body.user;
  const user = new User({ email, username });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userRecord => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
};

exports.currentUser = (req, res, next) => {
  res.json({
    user: {
      email: req.currentUser.email,
      confirmed: req.currentUser.confirmed,
      username: req.currentUser.username,
    },
  });
};
