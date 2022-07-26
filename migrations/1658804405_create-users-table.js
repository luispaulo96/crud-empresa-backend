/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    pk_users: { type: 'int8', notNull: true },
    vc_name: { type: 'varchar(100)', notNull: true },
    fk_roles: { type: 'int8', notNull: true },
    fk_departments: { type: 'int8', notNull: true },
  });

  pgm.addConstraint('users', 'user_pk', 'PRIMARY KEY (pk_users)');
  pgm.addConstraint('users', 'users_fk_1', 'FOREIGN KEY (fk_roles) REFERENCES public.roles(pk_roles)');
  pgm.addConstraint('users', 'users_fk_2', 'FOREIGN KEY (fk_departments) REFERENCES public.departments(pk_departments)');
};

exports.down = (pgm) => {
  pgm.dropTable('users', {
    ifExists: true,
  });
};
