const validarErro = async (error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode)
    res.json({
        status: "Erro",
        mensagem: error.message,
        stack: error.stack
    })
}

const validarPagina = function (req, res, next) {
    res.status(404).json({
        status: "Erro",
        mensagem: "Página não encontrada",
    });
}

module.exports = {
    validarErro,
    validarPagina
}