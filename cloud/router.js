const express = require("express");
const usuarioController = require("./controllers/usuarioController");
const usuarioMiddleware = require("./middlewares/usuarioMiddleware");

const router = express.Router();

router.get("/usuario/:id", usuarioController.ConsultarUsuarioPorID);
router.post(
  "/usuario",
  usuarioMiddleware.validateBody,
  usuarioController.CriarUsuario
);

module.exports = router;
