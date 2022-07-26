/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('departments', {
    pk_departments: { type: 'int8', notNull: true },
    vc_name: { type: 'varchar(100)', notNull: true },
    vc_description: { type: 'varchar(100)', notNull: true },
  });

  pgm.addConstraint('departments', 'departments_pk', 'PRIMARY KEY (pk_departments)');
};

exports.down = (pgm) => {
  pgm.dropTable('departments', {
    ifExists: true,
  });
};
