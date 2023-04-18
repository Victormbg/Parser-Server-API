const validateBody = (request, response, next) => {

  console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Entrou no validateBody`);

  const { body } = request;

  const requiredFields = ['idLinkedIn', 'nome', 'cpf', 'endereco'];
  const requiredEnderecoFields = ['cep'];

  for (const field of requiredFields) {

    if (!body[field]) {
      const err = new Error(`Campo '${field}' é obrigatório.`);
      err.status = 400;
      console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Erro: ${err.message}`);
      throw err;
    }

    if (typeof body[field] === 'string' && body[field].trim() === '') {
      const err = new Error(`Campo '${field}' não pode estar vazio.`);
      err.status = 400;
      console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Erro: ${err.message}`);
      throw err;
    }
    if (field === 'endereco') {

      for (const addressField of requiredEnderecoFields) {

        if (!body[field][addressField]) {
          const err = new Error(`Campo '${addressField}' é obrigatório.`);
          err.status = 400;
          console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Erro: ${err.message}`);
          throw err;
        }

        if (typeof body[field][addressField] === 'string' && body[field][addressField].trim() === '') {
          const err = new Error(`Campo '${addressField}' não pode estar vazio.`);
          err.status = 400;
          console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Erro: ${err.message}`);
          throw err;
        }

        if (addressField === 'cep' && body[field][addressField].length !== 8) {
          const err = new Error("Campo 'cep' é composto por oito dígitos, cinco de um lado e três de outro.");
          err.status = 400;
          console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Erro: ${err.message}`);
          throw err;
        }

      }
    }

  }

  console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Validou os dados do usuário com sucesso.`);
  next();
};

module.exports = {
  validateBody,
};
