/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('logins', {
    pk_logins: { type: 'int8', notNull: true },
    vc_email: { type: 'varchar(100)', notNull: true },
    vc_password: { type: 'varchar(255)', notNull: true },
  });

  pgm.addConstraint('logins', 'logins_pk', 'PRIMARY KEY (pk_logins)');
  pgm.addConstraint('logins', 'logins_un', 'UNIQUE (vc_email)');
};

exports.down = (pgm) => {
  pgm.dropTable('logins', {
    ifExists: true,
  });
};
