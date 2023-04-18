const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const usuarioMiddleware = require("../middlewares/usuarioMiddleware");

const router = express.Router();

router.get("/:id", (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    usuarioController.ConsultarUsuarioPorID(req, res, next);
});
router.post("/", usuarioMiddleware.validateBody, (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    usuarioController.CriarUsuario(req, res, next);
});
router.delete("/:id", (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    usuarioController.RemoverUsuario(req, res, next);
});
router.put("/:id", usuarioMiddleware.validateBody, (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    usuarioController.AtualizarUsuario(req, res, next);
});

module.exports = router;
