import type { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";
import 'ts-node/register';
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: "booters",
      user: process.env.BOOTERS_DB_POSTGRES_USERNAME,
      password: process.env.BOOTERS_DB_POSTGRES_PASSWORD,
    },
    ...knexSnakeCaseMappers(),
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: 'migrations'
    }
  }

};

export default config;
