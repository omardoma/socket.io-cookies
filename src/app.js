const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { SECRET } = process.env;

const app = express();

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
app.use(compression());
app.use(cookieParser(SECRET));
app.use(cookieEncrypter(SECRET));
app.use(express.static(path.resolve('public')));

app.use('/', (req, res) => {
  res.cookie(
    'someField',
    { someKey: 'someValue' },
    {
      sameSite: true, // Require that a cookie is not sent on cross-site requests, but only on resources that have the cookie domain as the origin, which should be a great help towards reducing the risk of CSRF (Cross Site Request Forgery) attacks.
      secure: process.env.NODE_ENV === 'production', //  Makes sure the cookie can only be transmitted securely over HTTPS, and it will not be sent over unencrypted HTTP connections
      httpOnly: true, // Disable the ability to edit the cookie on the client
      maxAge: 2 * 60 * 60, // Invalidate after 2 hours
      // signed: true, // Disable the ability to read the cookie on the client
    },
  );
  res.sendFile(path.resolve('public', 'index.html'));
});

module.exports = app;
