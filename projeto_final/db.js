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

//CRIAÇÃO DA FUNÇÃO PARA LISTAR USUÁRIOS
async function listCustomers() {

    const client = await connect();

    const sql = "SELECT * FROM clientes";

    const result = await client.query(sql);

    return result.rows;
    
};

//CRIAÇÃO DA FUNÇÃO PARA LISTAR UM USUÁRIO ESPECÍFICO
async function listCustomer(cpf) {

    const client = await connect();

    const sql = "SELECT * FROM clientes WHERE cpf = $1";
    const value = [cpf]

    const result = await client.query(sql, value);

    return result.rows;
    
}

//CRIAÇÃO DA FUNÇÃO PARA ATUALIZAR DADOS DE UM CLIENTE
async function updateCustomer(cpf, customer) {

    const client = await connect();

    const sql = "UPDATE clientes SET  nome=$1, email=$2, idade=$3, profissao=$4 WHERE cpf=$5";

    const values = [customer.nome, customer.email, customer.idade, customer.profissao, cpf];

    client.query(sql, values);
    
}

//CRIAÇÃO DA FUNÇÃO PARA DELETAR UM CLIENTE DO BANCO DE DADOS
async function deleteCustomer(cpf) {
    
    const client = await connect();

    const sql = "DELETE FROM clientes WHERE cpf=$1";
    const values = [cpf];

    await client.query(sql, values);

    console.log("Cliente deletado do banco de dados com sucesso!")
}

//EXPORTAÇÃO DA FUNÇÃO
module.exports = { 
    insertCustomer,
    listCustomers,
    listCustomer,
    updateCustomer,
    deleteCustomer
};
