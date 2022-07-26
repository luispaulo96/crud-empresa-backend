/**
 * Logging configuration
 * @module app/config/logging
 */

const winston = require('winston');
const path = require('path');

const fmt = winston.format;

module.exports = winston.createLogger({
  level: 'warn',
  format: fmt.combine(
    fmt.errors({
      stack: true,
    }),
    fmt.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
    }),
    fmt.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'warn',
    }),
  ],
});
