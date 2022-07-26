/**
 * Roles model
 * @module app/models/roles-model
 */

const { pool } = require('../config/database');
const { generateUniqueId } = require('../libraries/utilities');

async function getAll() {
  const res = await pool.query(`
    SELECT
      pk_roles,
      vc_name,
      vc_description,
      nu_salary
    FROM
      roles
  `);

  return res.rows;
}

async function getByItem(id) {
  const res = await pool.query(`
    SELECT
      pk_roles,
      vc_name,
      vc_description,
      nu_salary
    FROM
      roles
    WHERE
      pk_roles = $1
  `, [
    id,
  ]);

  return res.rows[0];
}

async function insertItem(jsonData) {
  const roleId = generateUniqueId();

  const res = await pool.query(`
    INSERT INTO
      roles
    VALUES (
      $1,
      $2,
      $3,
      $4
    )
    RETURNING
      *
  `, [
    roleId,
    jsonData.name,
    jsonData.description,
    jsonData.salary,
  ]);

  return res.rows[0];
}

async function updateItem(roleId, jsonData) {
  const res = await pool.query(`
    UPDATE
      roles
    SET
      vc_name = $1,
      vc_description = $2,
      nu_salary = $3
    WHERE
      pk_roles = $4
  `, [
    jsonData.name,
    jsonData.description,
    jsonData.salary,
    roleId,
  ]);

  return res.rowCount;
}

async function deleteItem(roleId) {
  const res = await pool.query(`
    DELETE FROM
      roles
    WHERE
      pk_roles = $1
  `, [
    roleId,
  ]);

  return res.rowCount;
}

module.exports = {
  getAll,
  getByItem,
  insertItem,
  updateItem,
  deleteItem,
};
