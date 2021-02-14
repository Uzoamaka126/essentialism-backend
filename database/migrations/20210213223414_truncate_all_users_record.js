exports.up = function (knex) {
  return knex.schema.table("users_values_alter", (table) => {
    table.uuid("userId");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users_values_alter");
};
