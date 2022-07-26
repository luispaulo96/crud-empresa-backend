/**
 * Database configuration
 * @module app/config/database
 */

const { Pool } = require('pg');

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_BASE,
} = process.env;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: DB_BASE,
});

module.exports = { pool };
