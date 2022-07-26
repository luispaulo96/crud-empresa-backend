#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require('debug')('crud-empresa-backend:server');
const http = require('http');
const app = require('../setup');

const wsLogger = require('../app/config/logging');

/**
 * Event handler for unhandled promise rejection.
 */

process.on('unhandledRejection', (reason) => {
  wsLogger.error(`Unhandled rejection at - ${reason.stack || reason}`);
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const normPort = parseInt(val, 10);

  if (Number.isNaN(normPort)) {
    // named pipe
    return val;
  }

  if (normPort >= 0) {
    // port number
    return normPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      wsLogger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      wsLogger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
