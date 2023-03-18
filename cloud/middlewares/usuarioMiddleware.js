const validateBody = (request, response, next) => {
  const { body } = request;

  if (body.nome === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'nome' é obrigatório",
    });
  }
  if (body.nome === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'nome' não pode estar vazio",
    });
  }

  next();
};

module.exports = {
  validateBody,
};
