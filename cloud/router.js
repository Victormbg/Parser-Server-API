const express = require("express");
// USUARIO
const usuarioController = require("./controllers/usuarioController");
const usuarioMiddleware = require("./middlewares/usuarioMiddleware");
// EMPRESA
const empresaController = require("./controllers/empresaController");
const empresaMiddleware = require("./middlewares/empresaMiddleware");

const router = express.Router();

// USUARIO
router.get("/usuario/:id", usuarioController.ConsultarUsuarioPorID);
router.post(
  "/usuario",
  usuarioMiddleware.validateBody,
  usuarioController.CriarUsuario
);
router.delete("/usuario/:id", usuarioController.RemoverUsuario);
router.put(
  "/usuario/:id",
  usuarioMiddleware.validateBody,
  usuarioController.AtualizarUsuario
);

// EMPRESA
router.get("/empresa/:id", empresaController.ConsultarEmpresaPorID);
router.post(
  "/empresa",
  empresaMiddleware.validateBody,
  empresaController.CriarEmpresa
);
router.delete("/empresa/:id", empresaController.RemoverEmpresa);
router.put(
  "/empresa/:id",
  empresaMiddleware.validateBody,
  empresaController.AtualizarEmpresa
);

module.exports = router;
