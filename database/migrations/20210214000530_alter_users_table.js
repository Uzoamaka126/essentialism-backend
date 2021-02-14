const e = require("express");

exports.up = function (knex) {
  // await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.uuid("userId");
    table.string("username", 128).notNullable().unique();
    table.string("email", 400).notNullable().unique();
    table.string("password", 100).notNullable();
    table.string("jwt", 512);
    table.boolean("isVerified").notNullable().defaultTo(0);
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
