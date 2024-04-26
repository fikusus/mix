exports.up = function (knex) {
  return knex.schema.createTable('subscribers', (table) => {
    table.increments('id').primary();
    table.bigInteger('chat_id').unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('subscribers');
};
