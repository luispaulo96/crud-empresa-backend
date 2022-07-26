/**
 * Logins model
 * @module app/models/logins-model
 */

const { pool } = require('../config/database');
const {
  generateUniqueId,
  passwordVerify,
  passwordHash,
  generateToken,
} = require('../libraries/utilities');

async function verifyLogin(email, password) {
  const res = await pool.query(`
    SELECT
      pk_logins,
      vc_email,
      vc_password
    FROM
      logins
    WHERE
      vc_email = $1
    LIMIT
      1
  `, [
    email,
  ]);

  if (!res.rowCount || !passwordVerify(password, res.rows[0].vc_password)) {
    return '';
  }

  return generateToken({
    id: res.rows[0].pk_logins,
    email: res.rows[0].vc_email,
  });
}

async function insertLogin(email, password) {
  const loginId = generateUniqueId();

  const res = await pool.query(`
    INSERT INTO
      logins
    VALUES (
      $1,
      $2,
      $3
    )
    RETURNING
      vc_email
  `, [
    loginId,
    email,
    passwordHash(password),
  ]);

  return res.rows[0];
}

module.exports = {
  verifyLogin,
  insertLogin,
};
