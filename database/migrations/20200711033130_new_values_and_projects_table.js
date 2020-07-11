exports.up = function (knex) {
    return knex.schema.createTable("new_users_values_projects_tasks", (table) => {
        table.increments("id");
        table
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users_values_plus_projects");
        table.string("task_name").notNullable();
        table.boolean("isCompleted").defaultTo(0).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.date('completed_by')

    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("new_users_values_projects_tasks");
};
