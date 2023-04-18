const express = require("express");
require('express-async-errors');
const { validarErro, validarPagina, tratarErroDeValidacao } = require('./middlewares/error');
const router = require("./router");

app.use(express.json());

// Rotas da API
app.use(router);

// Middleware de tratamento de erros
app.use(validarErro);

// Middleware de tratamento de erro de rota
app.use(validarPagina);

// Tratamento de erros conhecidos
app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        tratarErroDeValidacao(err, req, res, next);
    } else {
        next(err);
    }
});
