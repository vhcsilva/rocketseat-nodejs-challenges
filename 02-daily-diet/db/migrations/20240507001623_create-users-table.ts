import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('session_id').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
