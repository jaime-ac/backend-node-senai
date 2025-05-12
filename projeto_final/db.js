const { Pool } = require('pg');
require('dotenv').config();

async function connect() {

    const pool = new Pool({
    
        user: process.env.USER_NAME,
        host: process.env.HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    
    });
    
    const result = await pool.query('SELECT NOW()')
    console.log(result.rows)
    // console.log('Conexão ao banco de dados feito')
    
}

connect();
