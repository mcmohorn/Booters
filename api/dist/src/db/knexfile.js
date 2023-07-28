"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node/register");
// Update with your config settings.
const config = {
    development: {
        client: "postgresql",
        connection: {
            database: "booters",
            user: process.env.BOOTERS_DB_POSTGRES_USERNAME,
            password: process.env.BOOTERS_DB_POSTGRES_PASSWORD,
        },
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
module.exports = config;
//# sourceMappingURL=knexfile.js.map