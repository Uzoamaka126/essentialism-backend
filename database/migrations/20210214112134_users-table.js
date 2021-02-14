exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.uuid("userId");
      table.string("username", 128).notNullable().unique();
      table.string("email", 400).notNullable().unique();
      table.string("password", 100).notNullable();
      table.string("jwt", 512);
      table.boolean("isVerified").notNullable().defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
  };