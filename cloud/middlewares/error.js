const validarErro = (error, req, res, next) => {
    const { status = 500, message } = error;
    const resposta = { status: "Erro", mensagem: message };
    if (status === 500) {
        resposta.stack = error.stack;
    }
    res.status(status).json(resposta);
};


const validarPagina = (req, res, next) => {
    res.status(404).json({
        status: "Erro",
        mensagem: "Página não encontrada",
    });
};

const tratarErroDeValidacao = (err, req, res, next) => {
    res.status(400).json({
        status: "Erro",
        mensagem: "Erro de validação",
        erros: err.errors,
    });
};

module.exports = {
    validarErro,
    validarPagina,
    tratarErroDeValidacao
};
