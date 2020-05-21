exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username", 128).notNullable().unique();
    table.string("email", 400).notNullable().unique();
    table.string("password", 100).notNullable();
    table.string("jwt", 512);
    table.boolean("isVerified").notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
