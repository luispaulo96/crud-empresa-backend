/**
 * Users model
 * @module app/models/users-model
 */

const { pool } = require('../config/database');
const { generateUniqueId } = require('../libraries/utilities');

async function getByDepartment(id) {
  const res = await pool.query(`
    SELECT
      pk_users,
      us.vc_name,
      ro.vc_name role_name
    FROM
      users us
    JOIN
      roles ro
    ON
      ro.pk_roles = us.fk_roles
    JOIN
      departments de
    ON
      de.pk_departments = us.fk_departments
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
      pk_users,
      us.vc_name,
      fk_roles,
      fk_departments
    FROM
      users us
    JOIN
      roles ro
    ON
      ro.pk_roles = us.fk_roles
    JOIN
      departments de
    ON
      de.pk_departments = us.fk_departments
    WHERE
      pk_users = $1
  `, [
    id,
  ]);

  return res.rows[0];
}

async function insertItem(jsonData) {
  const userId = generateUniqueId();

  const res = await pool.query(`
    INSERT INTO
      users
    VALUES (
      $1,
      $2,
      $3,
      $4
    )
    RETURNING
      *
  `, [
    userId,
    jsonData.name,
    jsonData.roleId,
    jsonData.departmentId,
  ]);

  return res.rows[0];
}

async function updateItem(userId, jsonData) {
  const res = await pool.query(`
    UPDATE
      users
    SET
      vc_name = $1,
      fk_roles = $2,
      fk_departments = $3
    WHERE
      pk_users = $4
  `, [
    jsonData.name,
    jsonData.roleId,
    jsonData.departmentId,
    userId,
  ]);

  return res.rowCount;
}

async function deleteItem(userId) {
  const res = await pool.query(`
    DELETE FROM
      users
    WHERE
      pk_users = $1
  `, [
    userId,
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
