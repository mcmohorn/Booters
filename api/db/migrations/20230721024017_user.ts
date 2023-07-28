import { Knex } from "knex";
import constants from '../constants.json';
const userTableName = 'user';

const authProviderTableName = 'provider';

export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable(authProviderTableName, (table) => {
    table.uuid('id').primary();
    table.string('name', 100).notNullable();
    table.timestamp('created').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
  });

  await knex(authProviderTableName).insert({ 
    id: constants.provider.google, 
    name: "Google" 
  });

    await knex.schema.createTable(userTableName, (table) => {
        table.uuid('id').primary();
        table.string('name', 100).notNullable();
        table.string('first_name', 100)
        table.string('last_name', 100)
        table.string('email', 100).notNullable();
        table.uuid('provider_id').references('id').inTable(authProviderTableName);
        table.string('provider_ref', 100).notNullable(); // the unique id (e.g. 'sub' for Google)
    
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
      });
}

export async function down(knex: Knex): Promise<void> 
{
  await knex.schema.dropTable(userTableName);
  await knex.schema.dropTable(authProviderTableName);
}

