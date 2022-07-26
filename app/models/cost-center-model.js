/**
 * Cost Center model
 * @module app/models/cost-center-model
 */

const { pool } = require('../config/database');
const { generateUniqueId } = require('../libraries/utilities');

async function getByDepartment(id) {
  const res = await pool.query(`
    SELECT
      pk_cost_center,
      co.vc_name,
      nu_price
    FROM
      cost_center co
    JOIN
      departments de
    ON
      de.pk_departments = co.fk_departments
    WHERE
      de.pk_departments = $1
  `, [
    id,
  ]);

  return res.rows;
}

async function getByItem(id) {
  const res = await pool.query(`
    SELECT
      pk_cost_center,
      co.vc_name,
      nu_price,
      fk_departments
    FROM
      cost_center co
    JOIN
      departments de
    ON
      de.pk_departments = co.fk_departments
    WHERE
      pk_cost_center = $1
  `, [
    id,
  ]);

  return res.rows[0];
}

async function insertItem(jsonData) {
  const costCenterId = generateUniqueId();

  const res = await pool.query(`
    INSERT INTO
      cost_center
    VALUES (
      $1,
      $2,
      $3,
      $4
    )
    RETURNING
      *
  `, [
    costCenterId,
    jsonData.name,
    jsonData.price,
    jsonData.departmentId,
  ]);

  return res.rows[0];
}

async function updateItem(costCenterId, jsonData) {
  const res = await pool.query(`
    UPDATE
      cost_center
    SET
      vc_name = $1,
      nu_price = $2,
      fk_departments = $3
    WHERE
      pk_cost_center = $4
  `, [
    jsonData.name,
    jsonData.price,
    jsonData.departmentId,
    costCenterId,
  ]);

  return res.rowCount;
}

async function deleteItem(costCenterId) {
  const res = await pool.query(`
    DELETE FROM
      cost_center
    WHERE
      pk_cost_center = $1
  `, [
    costCenterId,
  ]);

  return res.rowCount;
}

module.exports = {
  getByDepartment,
  getByItem,
  insertItem,
  updateItem,
  deleteItem,
};
