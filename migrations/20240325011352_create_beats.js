/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('beats', (table) => {
    table.increments('id');
    table.integer('box_id').notNullable();
    table.integer('channel');
    table.string('title');
    table.boolean('recorded').defaultTo(false);
    table.timestamp('datetime', { precision: 0 }).defaultTo(knex.fn.now(0));

    table.foreign('box_id').references('boxes.id').onDelete('CASCADE');
    table.unique(['box_id', 'datetime']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('beats');
};
