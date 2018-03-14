import nodemailer from 'nodemailer';
import keys from '../config/keys';

const from = 'D&D Adventurers League Hub" <info@alhub.com>';

// Use mailtrap to generate fake email credentials
function setup() {
  return nodemailer.createTransport({
    host: keys.EMAIL_HOST,
    port: keys.EMAIL_PORT,
    auth: {
      user: keys.EMAIL_USER,
      pass: keys.EMAIL_PASS,
    },
  });
}

export function sendConfirmationEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Welcome to Adventurers League Hub',
    text: `
    Welcome to Adventurers League Hub. Please, confirm your email.
    ${user.generateConfirmationUrl()}
    `,
  };

  tranport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Reset Password',
    text: `
    To reset password follow this link
    ${user.generateResetPasswordLink()}
    `,
  };

  tranport.sendMail(email);
}
