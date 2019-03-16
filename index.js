const { bootstrapServer, closeServer } = require('./src/server');

const gracefulShutdown = async () => {
  try {
    await closeServer();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const catchTermination = () => {
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

(async () => {
  try {
    await bootstrapServer();
    catchTermination();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
