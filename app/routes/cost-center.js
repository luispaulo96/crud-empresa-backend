/**
 * Cost Center route
 * @module app/routes/cost-center
 */

const express = require('express');

const router = express.Router();
const wsLogger = require('../config/logging');
const { verifyToken } = require('../libraries/middlewares');
const costCenterModel = require('../models/cost-center-model');

router.get('/departments/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;
  let items = [];

  try {
    items = await costCenterModel.getByDepartment(id);
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
    item = await costCenterModel.getByItem(id);
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
    item = await costCenterModel.insertItem(jsonData);
    if (!item) {
      return res.status(400).json({
        message: 'Não foi possível inserir o centro de custo, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Centro de custo inserido com sucesso',
  });
});

router.put('/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;
  const jsonData = req.body;

  try {
    const rowCount = await costCenterModel.updateItem(id, jsonData);
    if (!rowCount) {
      return res.status(400).json({
        message: 'Não foi possível editar o centro de custo, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Centro de custo editado com sucesso',
  });
});

router.delete('/:id', [verifyToken], async (req, res) => {
  const { id } = req.params;

  try {
    const rowCount = await costCenterModel.deleteItem(id);
    if (!rowCount) {
      return res.status(400).json({
        message: 'Não foi possível remover o centro de custo, por favor tente mais tarde',
      });
    }
  } catch (err) {
    wsLogger.error(err);
    return res.status(500).json({
      message: 'Não foi possível completar a requisição, por favor tente mais tarde',
    });
  }

  return res.json({
    message: 'Centro de custo removido com sucesso',
  });
});

module.exports = router;
