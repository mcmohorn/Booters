import { Knex } from "knex";
export const areaTableName = "area";
import constants from '../constants.json';

export async function up(knex: Knex): Promise<void> {
  // create jump table
  await knex.schema.createTable(areaTableName, (table) => {
    table.uuid("id").primary();
    table.string("name", 30).notNullable();
    table.string("logo", 300);
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();

    table.timestamp("created").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated").notNullable().defaultTo(knex.fn.now());
  });

  const alta = {
    id: constants.area.alta,
    name: "Alta",
    latitude: 40.577804,
    longitude: -111.630006
  };

  const brighton = {
    id: constants.area.brighton,
    name: "Brighton",
    latitude: 40.592535,
    longitude: -111.578137
  };

  const parkcity = {
    id: constants.area.parkcity,
    name: "Park City",
    latitude: 40.636879,
    longitude: -111.521449
  };

  const deervalley = {
    id: constants.area.deervalley,
    name: "Deer Valley",
    latitude: 40.620271,
    longitude: -111.488767
  };

  const snowbird = {
    id: constants.area.snowbird,
    name: "Snowbird",
    latitude: 40.567291,
    longitude: -111.653515
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
