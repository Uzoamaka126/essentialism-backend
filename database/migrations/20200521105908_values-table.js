exports.up = function (knex) {
  return knex.schema.createTable("values", (table) => {
    table.increments("id");
    table.string("value_name", 400).notNullable().unique();
    table.string("description", 1000).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("values");
};
