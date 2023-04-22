const express = require("express");
const loginController = require("../controllers/loginController");
const loginMiddleware = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/:id", (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    loginController.ConsultarLoginPorID(req, res, next);
});
router.post("/", loginMiddleware.validateBody, (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    loginController.CriarLogin(req, res, next);
});
router.delete("/:id", (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    loginController.RemoverLogin(req, res, next);
});
router.put("/:id", loginMiddleware.validateBody, (req, res, next) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] ${req.method} ${req.originalUrl}`);
    loginController.AtualizarLogin(req, res, next);
});

module.exports = router;