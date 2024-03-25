/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('boxes', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('ip').notNullable();
    table.boolean('active').defaultTo(true);
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());

    table.unique(['name']);
    table.unique(['ip']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('boxes');
};
