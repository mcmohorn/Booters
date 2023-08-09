import { Knex } from "knex";
export const areaTableName = "area";
import constants from '../constants.json';

export async function up(knex: Knex): Promise<void> {
  // create jump table
  await knex.schema.createTable(areaTableName, (table) => {
    table.uuid("id").primary();
    table.string("name", 30).notNullable();
    table.string("logo", 300);
    table.point("location").notNullable();

    table.timestamp("created").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated").notNullable().defaultTo(knex.fn.now());
  });

  const alta = {
    id: constants.area.alta,
    name: "Alta",
    location: "(40.577804, -111.630006)",
  };

  const brighton = {
    id: constants.area.brighton,
    name: "Brighton",
    location: "(40.592535, -111.578137)",
  };

  const parkcity = {
    id: constants.area.parkcity,
    name: "Park City",
    location: "(40.636879, -111.521449)",
  };

  const deervalley = {
    id: constants.area.deervalley,
    name: "Deer Valley",
    location: "(40.620271, -111.488767)",
  };

  const snowbird = {
    id: constants.area.snowbird,
    name: "Snowbird",
    location: "(40.567291, -111.653515)",
  };

  await knex.insert(alta).into(areaTableName);
  await knex.insert(brighton).into(areaTableName);
  await knex.insert(parkcity).into(areaTableName);
  await knex.insert(deervalley).into(areaTableName);
  await knex.insert(snowbird).into(areaTableName);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(areaTableName);
}
