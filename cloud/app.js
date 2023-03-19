const express = require("express");
require('express-async-errors');
const errorMiddleware = require("./middlewares/error");
const router = require("./router");

app.use(express.json());
// Rotas da API
app.use(router);
// Tratar erros 500
app.use(errorMiddleware.validarErro)
// Tratar erros de pagina não encontrada (404)
app.use(errorMiddleware.validarPagina)
