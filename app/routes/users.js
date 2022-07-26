/**
 * Users route
 * @module app/routes/users
 */

const express = require('express');

const router = express.Router();
const wsLogger = require('../config/logging');
const { verifyToken } = require('../libraries/middlewares');
const usersModel = require('../models/users-model');

router.get('/departments/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;
  let items = [];

  try {
    items = await usersModel.getByDepartment(id);
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json(items);
});

router.get('/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;
  let item;

  try {
    item = await usersModel.getByItem(id);
    if (!item) {
      return res.status(404).json({
        message: 'Item não encontrado',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json(item);
});

router.post('/', [verifyToken], async (req, res) => {
  const jsonData = req.body;
  let item;

  try {
    item = await usersModel.insertItem(jsonData);
    if (!item) {
      return res.status(400).json({
        message: 'Não foi possível inserir o usuário, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Usuário inserido com sucesso',
  });
});

router.put('/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;
  const jsonData = req.body;

  try {
    const rowCount = await usersModel.updateItem(id, jsonData);
    if (!rowCount) {
      return res.status(400).json({
        message: 'Não foi possível editar o usuário, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Usuário editado com sucesso',
  });
});

router.delete('/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;

  try {
    const rowCount = await usersModel.deleteItem(id);
    if (!rowCount) {
      return res.status(400).json({
        message: 'Não foi possível remover o usuário, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Usuário removido com sucesso',
  });
});

module.exports = router;
