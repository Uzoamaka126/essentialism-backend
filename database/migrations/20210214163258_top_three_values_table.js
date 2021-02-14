exports.up = function (knex) {
    return knex.schema.createTable("top_three_values", (table) => {
        table.increments("id");
        table
            .integer("userId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("valueId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("values")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.uuid("topValuesId").notNullable().unique();
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
    .dropTableIfExists("top_three_values");
};