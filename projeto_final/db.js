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
async function insertCustomer(costumer) {

    //primeira coisa a fazer é garantir a conexão com o banco de dados
    const client = await connect();

    //consulta SQL
    const sql = "INSERT INTO clientes (cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5)";

    //acessando valores que vão ser inseridos
    const values = [costumer.cpf, costumer.nome, costumer.email, costumer.idade, costumer.profissao];

    //enviando os dados para o banco
    await client.query(sql, values);
 
};

//EXPORTAÇÃO DA FUNÇÃO
module.exports = { 
    insertCustomer
};
