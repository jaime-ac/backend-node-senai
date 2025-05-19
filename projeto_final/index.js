require('dotenv').config();

//IMPORTAR A FUNÇÃO DE INSERÇÃO DE DADOS

const db = require('./db');

const port = process.env.PORT;

const express = require('express');

const app = express();
app.use(express.json()) // Middleware para processar JSON

//ACESSAR A ROTA E USAR A FUNÇÃO IMPORTADA PARA INSERIR DADOS NA TABELA
app.post("/clientes", async (req, res) => {
    // const dadosCliente = req.body;
    
    await db.insertCustomer(req.body);

    res.sendStatus(201);
    console.log("Dados inseridos com sucesso!")

})

app.listen(port);

console.log('Backend rodando na porta', port)