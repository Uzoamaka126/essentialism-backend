exports.up = function (knex) {
    return knex.schema.createTable("tasks_table", (table) => {
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
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("projects")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("task_name").notNullable();
        table.boolean("isCompleted").defaultTo('false').notNullable();
        table.date('completed_by')
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
        .dropTableIfExists("projects")
        .dropTableIfExists("tasks_table");
};
