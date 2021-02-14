exports.up = function (knex) {
  return knex.schema.createTable("users_plus_values", (table) => {
    table.increments("id");
    table.string("name", 500).notNullable().unique();
    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users_plus_values");
};
