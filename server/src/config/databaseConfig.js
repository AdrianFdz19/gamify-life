import { config } from 'dotenv';
import pkg from 'pg'
const {Pool} = pkg;
config();

export let pool;

if (process.env.NODE_ENV === 'development') {
    pool = new Pool({
        host: 'localhost',
        database: 'gamify-life', 
        user: 'postgres', 
        port: 5432,
        password: '1214'
    });
} else {
    pool = new Pool({
        host: 'localhost',
        database: 'gamify-life', 
        user: 'postgres', 
        port: 5432,
        password: '1214'
    });
}
