/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('cost_center', {
    pk_cost_center: { type: 'int8', notNull: true },
    vc_name: { type: 'varchar(100)', notNull: true },
    nu_price: { type: 'numeric(12, 2)', notNull: true },
    fk_departments: { type: 'int8', notNull: true },
  });

  pgm.addConstraint('cost_center', 'cost_center_pk', 'PRIMARY KEY (pk_cost_center)');
  pgm.addConstraint('cost_center', 'cost_center_fk', 'FOREIGN KEY (fk_departments) REFERENCES public.departments(pk_departments)');
};

exports.down = (pgm) => {
  pgm.dropTable('cost_center', {
    ifExists: true,
  });
};
