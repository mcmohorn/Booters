import { Knex } from "knex";
import constants from '../constants.json';
import { areaTableName } from "./20230807023109_areas";
export const jumpTableName = 'jump';
export const jumpTypeTableName = 'jump_type';
export const difficultyTableName = 'difficulty';

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


      // create difficulty table
      await knex.schema.createTable(difficultyTableName, (table) => {
        table.uuid('id').primary();
        table.string('name', 30).notNullable();
        table.string('description', 300).notNullable();
        table.integer('rank').notNullable();
        
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
      });

      const easy = {
        id: constants.difficulty.easy,
        name: "Easy",
        description: "Anyone can try it",
        rank: 1,
      };

      const medium = {
        id: constants.difficulty.medium,
        name: "Medium",
        description: "Some experience required",
        rank: 2,
      };

      const hard = {
        id: constants.difficulty.hard,
        name: "Expert",
        description: "Experts only",
        rank: 3,
      };
    
      await knex.insert(easy).into(difficultyTableName);
      await knex.insert(medium).into(difficultyTableName);
      await knex.insert(hard).into(difficultyTableName);


      // create jump table
      await knex.schema.createTable(jumpTableName, (table) => {
        table.uuid('id').primary();
        table.string('name', 30).notNullable();
        table.string('description', 300);
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();

        table.uuid('jump_type_id').references('id').inTable(jumpTypeTableName).notNullable();
        table.uuid('area_id').references('id').inTable(areaTableName);
        table.uuid('difficulty_id').references('id').inTable(difficultyTableName).defaultTo(constants.difficulty.medium);
        
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
      });

      const theWaveJump = {
        id: "a1f2ed0d-7831-4c69-ba1d-ae407fe8e108",
        name: "The Wave",
        latitude: 40.555492,
        longitude: -111.649697,
        difficulty_id: constants.difficulty.easy,
        jump_type_id: constants.jumpType.booter,
        area_id: constants.area.snowbird,
        description: "Long berm with small to large launch points."
      };

      const jupiterOreBinJump = {
        id: "8f22d892-d067-492b-b1a2-91ad27bfb145",
        name: "Ore Bin",
        latitude: 40.613310,
        longitude: -111.546364,
        jump_type_id: constants.jumpType.booter,
        difficulty_id: constants.difficulty.hard,
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
  await knex.schema.dropTable(difficultyTableName);
}

