import { Knex } from "knex";
export const areaTableName = "area";

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
    id: "07e99af7-1131-44d0-a04b-09944c28d1e3",
    name: "Alta",
    location: "(40.577804, -111.630006)",
  };

  const brighton = {
    id: "e670c65f-5bb9-4276-9eb1-e86dae6bc9c7",
    name: "Brighton",
    location: "(40.592535, -111.578137)",
  };

  const parkcity = {
    id: "30d44764-6b41-4940-b1c7-f2b349bd7252",
    name: "Park City",
    location: "(40.636879, -111.521449)",
  };

  const deervalley = {
    id: "12240a6b-bb2e-478a-b456-45e8924ecf0f",
    name: "Deer Valley",
    location: "(40.620271, -111.488767)",
  };

  const snowbird = {
    id: "eabdd7f0-44b2-4f65-8a7c-4ff5b203a0fc",
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
