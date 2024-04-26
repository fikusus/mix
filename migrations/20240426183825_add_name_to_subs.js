/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('subscribers', (table) => {
    table.string('name', 100).notNullable().defaultTo('Anonymous');
    table.string('type', 10).notNullable().defaultTo('undefined');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('subscribers', (table) => {
    table.dropColumn('name');
    table.string('type');
  });
};
