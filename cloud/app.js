const express = require("express");
const router = require("./router");

app.use(express.json());
app.use(router);

// Função para erro 404
app.use(function (req, res, next) {
  res.status(404).json({
    status: "Erro",
    mensagem: "Página não encontrada",
  });
});
