"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://' + process.env.BOOTERS_DB_POSTGRES_USERNAME + ':' + process.env.BOOTERS_DB_POSTGRES_PASSWORD + '@' + process.env.BOOTERS_DB_POSTGRES_HOST + ':5432/booters',
    idleTimeoutMillis: 30000
});
//# sourceMappingURL=config.js.map