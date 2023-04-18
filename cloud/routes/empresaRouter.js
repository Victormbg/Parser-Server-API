const express = require("express");
const empresaController = require("../controllers/empresaController");
const empresaMiddleware = require("../middlewares/empresaMiddleware");

const router = express.Router();

router.get("/:id", empresaController.ConsultarEmpresaPorID);
router.post("/", empresaMiddleware.validateBody, empresaController.CriarEmpresa);
router.delete("/:id", empresaController.RemoverEmpresa);
router.put("/:id", empresaMiddleware.validateBody, empresaController.AtualizarEmpresa);

module.exports = router;
