const validateBody = (request, response, next) => {
  const { body } = request;

  const requiredFields = ['nome', 'sobrenome', 'idade', 'endereco'];
  const requiredAddressFields = ['logradouro', 'municipio', 'estado', 'pais'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return response.status(400).json({
        status: "Erro",
        mensagem: `Campo '${field}' é obrigatório`,
      });
    }

    if (typeof body[field] === 'string' && body[field].trim() === '') {
      return response.status(400).json({
        status: "Erro",
        mensagem: `Campo '${field}' não pode estar vazio`,
      });
    }

    if (field === 'idade' && body[field] < 18) {
      return response.status(400).json({
        status: "Erro",
        mensagem: "Campo 'idade' não pode ser menor de idade",
      });
    }

    if (field === 'endereco') {
      if (!body[field] || Object.keys(body[field]).length === 0) {
        return response.status(400).json({
          status: "Erro",
          mensagem: "O Objeto 'endereco' não pode ser vazio",
        });
      }

      for (const addressField of requiredAddressFields) {
        if (!body[field][addressField]) {
          return response.status(400).json({
            status: "Erro",
            mensagem: `Campo '${addressField}' é obrigatório`,
          });
        }

        if (typeof body[field][addressField] === 'string' && body[field][addressField].trim() === '') {
          return response.status(400).json({
            status: "Erro",
            mensagem: `Campo '${addressField}' não pode estar vazio`,
          });
        }
      }
    }
  }

  next();
};

module.exports = {
  validateBody,
};
