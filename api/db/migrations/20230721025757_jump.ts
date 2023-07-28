import { Knex } from "knex";
import constants from '../constants.json';
const jumpTableName = 'jump';
const jumpTypeTableName = 'jump_type';

export async function up(knex: Knex): Promise<void> {

    
      // create jump type table
      await knex.schema.createTable(jumpTypeTableName, (table) => {
        table.uuid('id').primary();
        table.string('name', 30).notNullable();
        table.string('description', 300);
    
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
      });

      await knex(jumpTypeTableName).insert({ 
        id: constants.jumpType.booter, 
        name: "booter"
      });

      await knex(jumpTypeTableName).insert({ 
        id: constants.jumpType.knuckle, 
        name: "knuckle"
      });

      await knex(jumpTypeTableName).insert({ 
        id: constants.jumpType.bank, 
        name: "bank"
      });

      await knex(jumpTypeTableName).insert({ 
        id: constants.jumpType.quarterpipe, 
        name: "quarterpipe"
      });

      await knex(jumpTypeTableName).insert({ 
        id: constants.jumpType.halfpipe, 
        name: "halfpipe" 
      });

      // create jump table
      await knex.schema.createTable(jumpTableName, (table) => {
        table.uuid('id').primary();
        table.string('name', 30).notNullable();
        table.string('description', 300);
        table.point('location').notNullable();

        table.uuid('jump_type_id').references('id').inTable(jumpTypeTableName).notNullable();
        
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
      });

      const theWaveJump = {
        id: "a1f2ed0d-7831-4c69-ba1d-ae407fe8e108",
        name: "The Wave",
        location: "(40.555492, -111.649697)",
        jump_type_id: constants.jumpType.booter,
        description: "Massive booter with small to large takeoff options.  A local favorite."
      };

      await knex.insert(theWaveJump).into(jumpTableName);
}

export async function down(knex: Knex): Promise<void> 
{
  await knex.schema.dropTable(jumpTableName);
  await knex.schema.dropTable(jumpTypeTableName);
}

