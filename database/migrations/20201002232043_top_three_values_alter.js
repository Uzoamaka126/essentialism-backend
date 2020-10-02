
exports.up = function(knex) {
    return knex.schema.createTable("users_values", (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("value_id")
        .unsigned()
        .notNullable()
        .unique()
        .references("id")
        .inTable("values");
    });
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTableIfExists("users_values");
 };
 