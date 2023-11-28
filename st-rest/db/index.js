import pkg from 'pg';
import { config } from 'dotenv';
config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

const query = async (text, params) => pool.query(text, params);

export {
    pool,
    query
}