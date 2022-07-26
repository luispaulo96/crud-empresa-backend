/**
 * Logins route
 * @module app/routes/logins
 */

const express = require('express');

const router = express.Router();
const wsLogger = require('../config/logging');
const { verifyToken } = require('../libraries/middlewares');
const loginsModel = require('../models/logins-model');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let generatedToken = '';

  try {
    generatedToken = await loginsModel.verifyLogin(email, password);
    if (!generatedToken) {
      return res.status(401).json({
        message: 'Usuário ou senha inválida',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Sucesso, redirecionando para a página inicial',
    token: generatedToken,
  });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const rowLogin = await loginsModel.insertLogin(email, password);
    if (!rowLogin) {
      return res.status(400).json({
        message: 'Não foi possível cadastrar, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    if (err.code === '23505') {
      return res.status(400).json({
        message: 'O email informado já está cadastrado',
      });
    }
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Sucesso, redirecionando para a página de login',
  });
});

router.post('/session', [verifyToken], async (req, res) => {
  res.status(204).json({});
});

module.exports = router;
