/**
 * Roles route
 * @module app/routes/roles
 */

const express = require('express');

const router = express.Router();
const wsLogger = require('../config/logging');
const rolesModel = require('../models/roles-model');
const { verifyToken } = require('../libraries/middlewares');

router.get('/', [verifyToken], async (req, res) => {
  let items = [];

  try {
    items = await rolesModel.getAll();
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
    item = await rolesModel.getByItem(id);
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
    item = await rolesModel.insertItem(jsonData);
    if (!item) {
      return res.status(400).json({
        message: 'Não foi possível inserir o cargo, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Cargo inserido com sucesso',
  });
});

router.put('/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;
  const jsonData = req.body;

  try {
    const rowCount = await rolesModel.updateItem(id, jsonData);
    if (!rowCount) {
      return res.status(400).json({
        message: 'Não foi possível editar o cargo, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Cargo editado com sucesso',
  });
});

router.delete('/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;

  try {
    const rowCount = await rolesModel.deleteItem(id);
    if (!rowCount) {
      return res.status(400).json({
        message: 'Não foi possível remover o cargo, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    if (err.code === '23503') {
      return res.status(400).json({
        message: 'O cargo ainda possui usuário associado',
      });
    }
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Cargo removido com sucesso',
  });
});

module.exports = router;
