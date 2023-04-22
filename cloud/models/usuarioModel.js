const {
  verificarLoginExistente,
  verificarEnderecoExistente,
  inserirEndereco,
  inserirUsuario,
  validarIdLinkedIn,
  buscarUsuarioPorIdLinkedIn,
  removerUsuarioPorIdLinkedIn,
  atualizarUsuarioPorIdLinkedIn
} = require('./queriesUsuario');
const query = require("./connection");

const criarUsuario = async (usuario) => {

  const { idLinkedIn, endereco, telefone } = usuario;

  try {

    await query('START TRANSACTION');

    // Verifica se o idLinkedIn existe na tabela "login"
    const loginExistente = await verificarLoginExistente(idLinkedIn);
    if (!loginExistente) {
      const err = new Error('Não foi possível criar o usuário, pois o idLinkedIn informado não existe na tabela de login');
      err.status = 409; // Define o código de status HTTP como 409 (Conflito)
      throw err;
    }

    // Verifica se o idLinkedIn já existe na tabela "usuario"
    const idLinkedInExistente = await validarIdLinkedIn(idLinkedIn);
    if (idLinkedInExistente) {
      const err = new Error('Não foi possível criar o usuário, pois o idLinkedIn informado já existe na tabela de usuários');
      err.status = 409; // Define o código de status HTTP como 409 (Conflito)
      throw err;
    }

    // Verifica se o CEP já existe na tabela "endereco"
    const enderecoExistente = await verificarEnderecoExistente(endereco.cep);
    let enderecoCEP;

    if (enderecoExistente) {
      // Caso já exista, utiliza o ID do endereço existente
      enderecoCEP = enderecoExistente.cep;
    } else {
      // Caso não exista, insere um novo endereço e utiliza o CEP gerado
      const enderecoInserido = await inserirEndereco(endereco);
      enderecoCEP = enderecoInserido.cep;
    }

    let dddFixo = null, numeroFixo = null, dddCelular = null, numeroCelular = null;
    if (telefone) {
      const { tipo, ddd, numero } = telefone;
      if (tipo === 'fixo') {
        dddFixo = ddd;
        numeroFixo = numero;
      } else if (tipo === 'celular') {
        dddCelular = ddd;
        numeroCelular = numero;
      }
    }

    const usuarioId = await inserirUsuario(usuario, enderecoCEP, dddFixo, numeroFixo, dddCelular, numeroCelular)

    await query('COMMIT');

    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Usuário criado com sucesso!`);

    return usuarioId;

  } catch (err) {
    await query('ROLLBACK');
    console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao criar usuário: ${err.message}`);
    throw err;
  }
};

const consultarUsuarioPorId = async (idLinkedIn) => {
  console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Consultando usuário de idLinkedIn: ${idLinkedIn}`);
  try {
    const usuario = await buscarUsuarioPorIdLinkedIn(idLinkedIn);
    if (!usuario) { // Verifica se o usuário não foi encontrado
      console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Usuário de idLinkedIn ${idLinkedIn} não encontrado`);
      const err = new Error(`Usuário de idLinkedIn ${idLinkedIn} não encontrado`);
      err.status = 404;
      throw err;
    } else {
      console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Usuário de idLinkedIn ${idLinkedIn} encontrado`);
      const usuarioFormatado = {
        idLinkedIn: idLinkedIn,
        nome: usuario.nome || null,
        sobrenome: usuario.sobrenome || null,
        foto: usuario.foto || null,
        dataNascimento: usuario.dataNascimento || null,
        cpf: usuario.cpf || null,
        tipoConta: usuario.tipoConta || null,
        endereco: {
          logradouro: usuario.logradouro || null,
          numero: usuario.numeroEndereco || null,
          complemento: usuario.complementoEndereco || null,
          estado: usuario.estado || null,
          pais: usuario.pais || null,
          cep: usuario.cep || null
        },
        telefone: {
          tipo: usuario.dddFixo && usuario.numeroFixo ? 'fixo' : usuario.dddCelular && usuario.numeroCelular ? 'celular' : null,
          ddd: usuario.dddFixo || usuario.dddCelular || null,
          numero: usuario.numeroFixo || usuario.numeroCelular || null
        }
      };
      return usuarioFormatado;
    }
  } catch (err) {
    console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao consultar usuário de idLinkedIn ${idLinkedIn}: ${err.message}`);
    throw err;
  }
};

const removerUsuario = async (idLinkedIn) => {
  try {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Iniciando remoção de usuário com ID ${idLinkedIn}`);
    const usuario = await buscarUsuarioPorIdLinkedIn(idLinkedIn);
    if (!usuario) { // Verifica se o usuário não foi encontrado
      console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Usuário de idLinkedIn ${idLinkedIn} não encontrado`);
      const err = new Error(`Usuário de idLinkedIn ${idLinkedIn} não encontrado`);
      err.status = 404;
      throw err;
    } else {
      const resultadoRemocao = await removerUsuarioPorIdLinkedIn(idLinkedIn);
      console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Usuário removido com sucesso!`);
      return resultadoRemocao;
    }
  } catch (err) {
    console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao remover usuário: ${err.message}`);
    throw err;
  }
};


const atualizarUsuario = async (idLinkedIn, usuario) => {

  const { endereco, telefone } = usuario;

  try {
    // Inicia uma transação
    await query('START TRANSACTION');

    // Verifica se o usuário existe
    const usuarioBusca = await buscarUsuarioPorIdLinkedIn(idLinkedIn);
    if (!usuarioBusca) { // Verifica se o usuário não foi encontrado
      console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Usuário de idLinkedIn ${idLinkedIn} não encontrado`);
      const err = new Error(`Usuário de idLinkedIn ${idLinkedIn} não encontrado`);
      err.status = 404;
      throw err;
    }

    // Verifica se o CEP já existe na tabela "endereco"
    const enderecoExistente = await verificarEnderecoExistente(endereco.cep);
    let enderecoCEP;

    if (enderecoExistente) {
      // Caso já exista, utiliza o ID do endereço existente
      enderecoCEP = enderecoExistente.cep;
    } else {
      // Caso não exista, insere um novo endereço e utiliza o CEP gerado
      const enderecoInserido = await inserirEndereco(endereco);
      enderecoCEP = enderecoInserido.cep;
    }

    let dddFixo = null, numeroFixo = null, dddCelular = null, numeroCelular = null;
    if (telefone) {
      const { tipo, ddd, numero } = telefone;
      if (tipo === 'fixo') {
        dddFixo = ddd;
        numeroFixo = numero;
      } else if (tipo === 'celular') {
        dddCelular = ddd;
        numeroCelular = numero;
      }
    }

    // Atualiza o usuário
    await atualizarUsuarioPorIdLinkedIn(idLinkedIn, usuario, enderecoCEP, dddFixo, numeroFixo, dddCelular, numeroCelular);

    // Finaliza a transação
    await query('COMMIT');

    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Usuário atualizado com sucesso!`);
    return true;

  } catch (error) {
    // Desfaz a transação em caso de erro
    await query('ROLLBACK');
    console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao atualizar usuário: ${error.message || error}`);
    const err = new Error(`Erro ao atualizar usuário: ${error.message || error}`);
    throw err;
  }
};

module.exports = {
  criarUsuario,
  consultarUsuarioPorId,
  removerUsuario,
  atualizarUsuario,
};
