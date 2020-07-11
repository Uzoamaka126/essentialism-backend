exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id");
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
        .dropTableIfExists("projects")
        .dropTableIfExists("tasks");
};
