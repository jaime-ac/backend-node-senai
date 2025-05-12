const { Pool } = require('pg');
require('dotenv').config();

async function connect() {

    const pool = new Pool({
    
        user: process.env.USER_NAME,
        host: process.env.HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    
    });
    
    // const result = await pool.query('SELECT NOW()') //pega a hora e a data atual da conexão com o servidor
    // console.log(result.rows)

    const client = await pool.connect();
    console.log('O Pool de conexão foi criado!')
    client.release();


    return pool.connect();
}

connect();

//CRIAÇÃO DA FUNÇÃO PARA INSERIR DADOS NA TABELA

//EXPORTAÇÃO DA FUNÇÃO
