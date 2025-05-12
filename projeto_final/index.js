require('dotenv').config();

//IMPORTAR A FUNÇÃO DE INSERÇÃO DE DADOS

const db = require('./db');

const port = process.env.PORT;

const express = require('express');

const app = express();

//ACESSAR A ROTA E USAR A FUNÇÃO IMPORTADA PARA INSERIR DADOS NA TABELA

app.listen(port);

console.log('Backend rodando na porta', port)