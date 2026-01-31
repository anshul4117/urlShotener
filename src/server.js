import dotenv from 'dotenv';
import app from './index.js';
import { connectDB, disconnectDB } from './config/db.js';

dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 5000;
let server;

async function start() {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
    });
  } catch (err) {
    console.error('Failed to start application', err);
    process.exit(1);
  }
}

function gracefulShutdown(signal) {
  return async () => {
    console.log(`Received ${signal} - closing server`);
    if (server) {
      server.close(async (err) => {
        if (err) {
          console.error('Error closing server', err);
          process.exit(1);
        }
        try {
          await disconnectDB();
        } catch (e) {
          console.warn('Error during DB disconnect', e);
        }
        console.log('Shutdown complete');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };
}

process.on('SIGINT', gracefulShutdown('SIGINT'));
process.on('SIGTERM', gracefulShutdown('SIGTERM'));
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection', reason);
});

start();