const validateBody = (request, response, next) => {
  const { body } = request;

  if (body.NomeEmpresa === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'NomeEmpresa' é obrigatório",
    });
  }

  if (body.NomeEmpresa === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'NomeEmpresa' não pode estar vazio",
    });
  }

  if (body.RazaoSocial === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'RazaoSocial' é obrigatório",
    });
  }

  if (body.RazaoSocial === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'RazaoSocial' não pode estar vazio",
    });
  }

  if (body.cnpj === undefined) {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'cnpj' é obrigatório",
    });
  }

  if (body.cnpj === "") {
    return response.status(400).json({
      status: "Erro",
      mensagem: "Campo 'cnpj' não pode estar vazio",
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
