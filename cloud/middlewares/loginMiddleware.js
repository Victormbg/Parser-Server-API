const validateBody = (request, response, next) => {

  console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Entrou no validateBody`);

  const { body } = request;

  const requiredFields = ['idLinkedIn'];

  for (const field of requiredFields) {

    if (body[field] === undefined || body[field] === null) {
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

  }

  console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] Validou os dados do login com sucesso.`);
  next();
};

module.exports = {
  validateBody,
};
