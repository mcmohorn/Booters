import { Knex } from "knex";
import constants from '../constants.json';
import { areaTableName } from "./20230807023109_areas";
const jumpTableName = 'jump';
export const jumpTypeTableName = 'jump_type';

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
        name: "booter",
        description: "Jump with takeoff and sloped landing"
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

      await knex(jumpTypeTableName).insert({ 
        id: constants.jumpType.cliff, 
        name: "cliff",
        description: "Immediate drop off"
      });

      // create jump table
      await knex.schema.createTable(jumpTableName, (table) => {
        table.uuid('id').primary();
        table.string('name', 30).notNullable();
        table.string('description', 300);
        table.point('location').notNullable();

        table.uuid('jump_type_id').references('id').inTable(jumpTypeTableName).notNullable();
        table.uuid('area_id').references('id').inTable(areaTableName);
        
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
      });

      const theWaveJump = {
        id: "a1f2ed0d-7831-4c69-ba1d-ae407fe8e108",
        name: "The Wave",
        location: "(40.555492, -111.649697)",
        jump_type_id: constants.jumpType.booter,
        area_id: constants.area.snowbird,
        description: "Long berm with small to large launch points."
      };

      const jupiterOreBinJump = {
        id: "8f22d892-d067-492b-b1a2-91ad27bfb145",
        name: "Ore Bin",
        location: "(40.613310, -111.546364)",
        jump_type_id: constants.jumpType.booter,
        area_id: constants.area.parkcity,
        description: "Small kicker near the Jupiter Ore Bin"
      };

      await knex.insert(theWaveJump).into(jumpTableName);
      await knex.insert(jupiterOreBinJump).into(jumpTableName);
}

export async function down(knex: Knex): Promise<void> 
{
  await knex.schema.dropTable(jumpTableName);
  await knex.schema.dropTable(jumpTypeTableName);
}

