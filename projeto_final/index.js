require('dotenv').config();

//IMPORTAR A FUNÇÃO DE INSERÇÃO DE DADOS

const db = require('./db');

const port = process.env.PORT;

const express = require('express');

const app = express();
app.use(express.json()) // Middleware para processar JSON

//ACESSAR A ROTA E USAR A FUNÇÃO IMPORTADA PARA INSERIR DADOS NA TABELA
app.post("/clientes", async (req, res) => {
    
    await db.insertCustomer(req.body);

    res.sendStatus(201);
    console.log("Dados inseridos com sucesso!")

})

//ACESSAR A ROTA E LISTAR TODOS OS MEUS CLIENTES
app.get("/clientes", async (req, res) => {

    const clientes = await db.listCustomers();

    res.json(clientes);
    
});

//ACESSAR A ROTA E LISTAR UM CLIENTE ESPECÍFICO
app.get("/clientes/:cpf", async (req, res) => {

    const { cpf } = req.params;

    const cliente = await db.listCustomer(cpf);

    res.json(cliente);
    
});

//ACESSAR A ROTA E ATUALIZAR DADOS DE UM CLIENTE
app.put("/clientes/:cpf", async (req, res) => {

    const { cpf } = req.params;

    await db.updateCustomer(req.params.cpf, req.body);

    res.sendStatus(200)

});

//ACESSAR A ROTA E DELETAR UM CLIENTE
app.delete("/clientes/:cpf", async (req, res) => {

    const { cpf } = req.params;

    await db.deleteCustomer(cpf);

    res.sendStatus(204);
});

app.listen(port);

console.log('Backend rodando na porta', port)