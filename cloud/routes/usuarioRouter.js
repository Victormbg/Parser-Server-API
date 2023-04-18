const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const usuarioMiddleware = require("../middlewares/usuarioMiddleware");

const router = express.Router();

router.get("/:id", usuarioController.ConsultarUsuarioPorID);
router.post("/", usuarioMiddleware.validateBody, usuarioController.CriarUsuario);
router.delete("/:id", usuarioController.RemoverUsuario);
router.put("/:id", usuarioMiddleware.validateBody, usuarioController.AtualizarUsuario);

module.exports = router;
