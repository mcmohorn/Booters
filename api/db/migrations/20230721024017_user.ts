import { Knex } from "knex";

const tableName = 'user';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid('id');
        table.string('firstName', 100).notNullable();
        table.string('lastName', 100).notNullable();
    
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
      });
}

export async function down(knex: Knex): Promise<void> 
{
  await knex.schema.dropTable(tableName);
}

