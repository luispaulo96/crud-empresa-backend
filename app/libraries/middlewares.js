/**
 * General middlewares
 * @module app/libraries/middlewares
 */

const wsLogger = require('../config/logging');
const { getBearerToken, isTokenValid } = require('./utilities');

const verifyToken = (req, res, next) => {
  const token = getBearerToken(req.headers.authorization || '');

  try {
    isTokenValid(token);
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        wsLogger.error(err);
        return res.status(403).json({
          message: 'Tempo de sessão expirada',
        });
      case 'JsonWebTokenError':
      case 'NotBeforeError':
        wsLogger.error(err);
        return res.status(403).json({
          message: 'Sessão vazia ou inválida',
        });
      default:
        wsLogger.error(err);
        return res.status(500).json({
          message: 'Não foi possível completar a requisição, por favor tente mais tarde',
        });
    }
  }

  return next();
};

module.exports = {
  verifyToken,
};
