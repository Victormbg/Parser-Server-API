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

  if (body.sobrenome === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'sobrenome' é obrigatório",
    });
  }

  if (body.sobrenome === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'sobrenome' não pode estar vazio",
    });
  }

  if (body.idade === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'idade' é obrigatório",
    });
  }

  if (body.idade === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'idade' não pode estar vazio",
    });
  }

  if (body.idade < 18) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'idade' não pode ser menor de idade",
    });
  }

  if (body.endereco.logradouro === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'logradouro' é obrigatório",
    });
  }

  if (body.endereco.logradouro === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'logradouro' não pode estar vazio",
    });
  }

  if (body.endereco.municipio === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'municipio' é obrigatório",
    });
  }

  if (body.endereco.municipio === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'municipio' não pode estar vazio",
    });
  }

  if (body.endereco.estado === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'estado' é obrigatório",
    });
  }

  if (body.endereco.estado === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'estado' não pode estar vazio",
    });
  }

  if (body.endereco.pais === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'pais' é obrigatório",
    });
  }

  if (body.endereco.pais === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'pais' não pode estar vazio",
    });
  }

  next();
};

module.exports = {
  validateBody,
};
