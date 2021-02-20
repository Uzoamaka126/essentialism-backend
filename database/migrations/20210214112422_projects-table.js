exports.up = function (knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id')
    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .integer('valueId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('values')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.string('title').notNullable()
    table.uuid('projectId').notNullable().unique()
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.fn.now())
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('values')
    .dropTableIfExists('users')
    .dropTableIfExists('projects')
}
