const io = require('socket.io')();
const cookieParser = require('cookie-parser');
const cookieDecrypter = require('cookie-encrypter');

const { SECRET } = require('../config');

const ioCookieParser = (...args) => {
  const parser = cookieParser(...args);
  return (socket, next) => parser(socket.request, null, next);
};

const ioCookieDecrypter = (...args) => {
  const decrypter = cookieDecrypter(...args);
  return (socket, next) => decrypter(socket.request, {}, next);
};

// Parse cookies
io.use(ioCookieParser(SECRET));

// Decrypt cookies
io.use(ioCookieDecrypter(SECRET));

// Authenticate cookies
io.use(async (socket, next) => {
  const req = socket.request;
  const { cookies, signedCookies } = req;
  console.log('Cookies', cookies);
  console.log('Signed Cookies', signedCookies);
  try {
    // Do some auth logic with the cookies
    await Promise.resolve();
    next();
  } catch (err) {
    // Terminate the connection if unauthorized
    next(new Error('Unauthorized Connection'));
  }
});

// To be configured to Frontend domain name or left as a wildcard in case of usage with mobile app as well
io.origins(['*:*']);

// Listen to connections on the default namespace
io.sockets.on('connection', socket => {
  socket.on('join', room => {
    socket.join(room, err => {
      if (err) {
        // If an error occurred while joining the intended room, forcefully disconnect the client
        socket.disconnect(true);
      }
    });
  });
  socket.on('echo', () => socket.emit('echo'));
  socket.on('leave', room => {
    socket.leave(room);
  });
});

module.exports = io;
