exports.up = function (knex) {
    return knex.schema.createTable("users_values_plus_projects", (table) => {
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
            .references("id")
            .inTable("values");
        table.string("project_name").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users_values_plus_projects");
};
