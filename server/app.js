import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import cors from 'cors';
import keys from './api/config/keys';

const app = express();

// MongoDb connection
mongoose.Promise = Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(keys.MONGO_DB_URI_TEST);
} else {
  mongoose.connect(keys.MONGO_DB_URI);
}
// Middlewares
if (!process.env.NODE_ENV === 'test') {
  app.use(logger('dev'));
}

app.use(cors({ credentials: true }));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes
const authRoutes = require('./api/routes/auth');
const usersRoutes = require('./api/routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
