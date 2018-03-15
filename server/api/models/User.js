import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import keys from '../config/keys';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmationToken: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.compareSync(password, 10);
};

userSchema.methods.setComfirmationToken = function setComfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

userSchema.methods.generateConfirmUrl = function generateConfirmUrl() {
  return `${keys.HOST}/confirmation/${this.confirmationToken}`;
};

userSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${keys.HOST}/reset_password/${this.generateResetPasswordToken}`;
};

userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      username: this.username,
      confirmed: this.confirmed,
    },
    keys.JWT_SECRET
  );
};

userSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id,
    },
    keys.JWT_SECRET,
    { expiresIn: '1s' }
  );
};

userSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    username: this.username,
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

userSchema.plugin(uniqueValidator, {
  message: 'This email is already taken, try another one.',
});

module.exports = mongoose.model('User', userSchema);
