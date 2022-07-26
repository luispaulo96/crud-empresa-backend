/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('roles', {
    pk_roles: { type: 'int8', notNull: true },
    vc_name: { type: 'varchar(100)', notNull: true },
    vc_description: { type: 'varchar(100)', notNull: true },
    nu_salary: { type: 'numeric(12, 2) ', notNull: true },
  });

  pgm.addConstraint('roles', 'roles_pk', 'PRIMARY KEY (pk_roles)');
};

exports.down = (pgm) => {
  pgm.dropTable('roles', {
    ifExists: true,
  });
};
