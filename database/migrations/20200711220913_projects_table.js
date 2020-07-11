exports.up = function (knex) {
    return knex.schema.createTable("projects", (table) => {
        table.increments("id");
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("value_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("values")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("project_name").notNullable();
        table
            .timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .timestamp("updatedAt")
            .defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("values")
        .dropTableIfExists("projects");
};
