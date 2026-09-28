import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api_barberPro',
    password: '11231415@Ll23',
    port: 5432
});

export default pool;