exports.up = function (knex) {
  return knex.schema.createTable("users_and_values", (table) => {
    table.increments("id");
    table.string("name").notNullable();
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
  return knex.schema.dropTableIfExists("users_and_values");
};
