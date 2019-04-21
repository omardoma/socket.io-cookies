const { bootstrapServer, closeServer } = require('./src/server');

const gracefulShutdown = signal => async () => {
  console.log(signal);
  if (signal === 'SIGUSR2') {
    process.kill(process.pid, signal);
  } else {
    try {
      await closeServer();
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

const catchTermination = () => {
  process.on('SIGHUP', gracefulShutdown('SIGHUP'));
  process.on('SIGTERM', gracefulShutdown('SIGTERM'));
  process.on('SIGINT', gracefulShutdown('SIGINT'));
  process.once('SIGUSR2', gracefulShutdown('SIGUSR2'));
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
