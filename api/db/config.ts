import { Pool } from 'pg';


export default new Pool ({
    max: 20,
    connectionString: 'postgres://'+process.env.BOOTERS_DB_POSTGRES_USERNAME+':'+process.env.BOOTERS_DB_POSTGRES_PASSWORD+'@'+process.env.BOOTERS_DB_POSTGRES_HOST+':5432/booters',
    idleTimeoutMillis: 30000
});