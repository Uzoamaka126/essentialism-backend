exports.up = function (knex) {
    return knex.schema.createTable("top_values", (table) => {
        table.increments("id");
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("name").notNullable();
        table
            .timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("top_values");
};
