const express = require("express");
const loginRouter = require("./routes/loginRouter");
const usuarioRouter = require("./routes/usuarioRouter");
const empresaRouter = require("./routes/empresaRouter");

const router = express.Router();

router.use("/login", loginRouter);
router.use("/usuario", usuarioRouter);
router.use("/empresa", empresaRouter);

module.exports = router;