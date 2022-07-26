/**
 * General utilities
 * @module app/libraries/utilities
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateUniqueId() {
  return process.hrtime.bigint();
}

function passwordHash(password) {
  return bcrypt.hashSync(password);
}

function passwordVerify(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function generateToken(object) {
  return jwt.sign(object, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}

function getBearerToken(authorization) {
  const parts = authorization.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return '';
  }

  return parts[1];
}

function isTokenValid(token) {
  return jwt.verify(token, process.env.JWT_KEY);
}

module.exports = {
  generateUniqueId,
  passwordHash,
  passwordVerify,
  generateToken,
  getBearerToken,
  isTokenValid,
};
