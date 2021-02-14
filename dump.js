
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

//  projects
exports.up = function (knex) {
    return knex.schema.createTable("users_values_projects", (table) => {
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
      table.string("project_name").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users_values_projects");
  };

//   tasks
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

// tasks 2
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

// top three values
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

// projects 2
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

