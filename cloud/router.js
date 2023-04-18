const express = require("express");
const usuarioRouter = require("./routes/usuarioRouter");
const empresaRouter = require("./routes/empresaRouter");

const router = express.Router();

router.use("/usuario", usuarioRouter);
router.use("/empresa", empresaRouter);

module.exports = router;