/**
 * Departments model
 * @module app/models/departments-model
 */

const { pool } = require('../config/database');
const { generateUniqueId } = require('../libraries/utilities');

async function getAll() {
  const res = await pool.query(`
    SELECT
      pk_departments,
      de.vc_name,
      vc_description,
      COALESCE(SUM(nu_price), 0.00) total_cost
    FROM
      departments de
    LEFT JOIN
      cost_center co
    ON
      fk_departments = pk_departments
    GROUP BY
      pk_departments
  `);

  return res.rows;
}

async function getByItem(id) {
  const res = await pool.query(`
    SELECT
      pk_departments,
      vc_name,
      vc_description
    FROM
      departments
    WHERE
      pk_departments = $1
  `, [
    id,
  ]);

  return res.rows[0];
}

async function insertItem(jsonData) {
  const departmentId = generateUniqueId();

  const res = await pool.query(`
    INSERT INTO
      departments
    VALUES (
      $1,
      $2,
      $3
    )
    RETURNING
      *
  `, [
    departmentId,
    jsonData.name,
    jsonData.description,
  ]);

  return res.rows[0];
}

async function updateItem(departmentId, jsonData) {
  const res = await pool.query(`
    UPDATE
      departments
    SET
      vc_name = $1,
      vc_description = $2
    WHERE
      pk_departments = $3
  `, [
    jsonData.name,
    jsonData.description,
    departmentId,
  ]);

  return res.rowCount;
}

async function deleteItem(departmentId) {
  const res = await pool.query(`
    DELETE FROM
      departments
    WHERE
      pk_departments = $1
  `, [
    departmentId,
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
