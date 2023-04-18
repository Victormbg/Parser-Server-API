const query = require("./connection");

const criarUsuario = async (usuario) => {
  const { nome, sobrenome, idade } = usuario;
  const { logradouro, municipio, estado, pais } = usuario.endereco;
  const sql =
    "INSERT INTO usuario(nome, sobrenome, idade, logradouro, municipio, estado, pais) VALUES (?, ?, ?, ?, ?, ?, ?)";
  try {
    const result = await query(sql, [
      nome,
      sobrenome,
      idade,
      logradouro,
      municipio,
      estado,
      pais,
    ]);
    console.log(`[${new Date().toISOString()}] - Usuário criado com sucesso!`);
    return result.insertId;
  } catch (err) {
    console.error(`[${new Date().toISOString()}] - Erro ao criar usuário: ${err.message}`);
    throw err;
  }
};

const criarUsuario2 = async (usuario) => {
  const { idLinkedIn, nome, sobrenome, dataNascimento, cpf, endereco, telefone } = usuario;

  try {
    await query('START TRANSACTION');

    const { insertId: loginId } = await query(
      'INSERT INTO login (idLinkedIn) VALUES (?)',
      [idLinkedIn]
    );

    const { insertId: usuarioId } = await query(
      'INSERT INTO usuario (nome, sobrenome, cpf, dataNascimento, login_idLogin) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, dataNascimento, cpf, loginId]
    );

    const { insertId: enderecoId } = await query(
      'INSERT INTO endereco (tipo, logradouro, cep, bairro, estado, pais, usuario_idusuario) VALUES (?, ?, ?, ?, ?, ?)',
      [endereco.tipo, endereco.logradouro, endereco.cep, endereco.bairro, endereco.estado, endereco.pais, usuarioId]
    );

    const { insertId: telefoneId } = await query(
      'INSERT INTO telefone (tipo, ddd, numero, usuario_idusuario) VALUES (?, ?, ?, ?)',
      [telefone.tipo, telefone.ddd, telefone.numero, usuarioId]
    );

    await query('COMMIT');

    console.log(`[${new Date().toISOString()}] - Usuário criado com sucesso!`);
    return usuarioId;
  } catch (err) {
    await query('ROLLBACK');
    console.error(`[${new Date().toISOString()}] - Erro ao criar usuário: ${err.message}`);
    throw err;
  }
};

const consultarUsuarioPorId = async (id) => {
  console.log(`[${new Date().toISOString()}] - Consultando usuário de ID: ${id}`);
  const sql = "SELECT * FROM `usuario` WHERE `id` = ?";
  try {
    const [rows, fields] = await query(sql, [id]);
    if (!rows || rows.length === 0) { // Verifica se rows é indefinido ou vazio
      console.log(`[${new Date().toISOString()}] - Usuário de ID ${id} não encontrado`);
      const err = new Error("Usuário não encontrado");
      err.status = 404; // Define o status do erro como 'Not Found'
      throw err;
    } else {
      console.log(`[${new Date().toISOString()}] - Usuário de ID ${id} encontrado`);
      console.log(rows)
      const usuarioFormatado = {
        nome: rows.nome || null,
        sobrenome: rows.sobrenome || null,
        idade: rows.idade || null,
        endereco: {
          logradouro: rows.logradouro || null,
          municipio: rows.municipio || null,
          estado: rows.estado || null,
          pais: rows.pais || null
        }
      };
      return usuarioFormatado;
    }
  } catch (err) {
    console.error(`[${new Date().toISOString()}] - Erro ao consultar usuário de ID ${id}: ${err.message}`);
    throw err;
  }
};

const removerUsuario = async (id) => {
  try {
    console.log(`[${new Date().toISOString()}] - Iniciando remoção de usuário com ID ${id}`);
    const resultadoConsulta = await consultarUsuarioPorId(id);
    if (resultadoConsulta === "Usuário não encontrado") {
      console.log(`[${new Date().toISOString()}] - Usuário não encontrado`);
      const err = new Error("Usuário não encontrado");
      err.status = 404; // Define o status do erro como 'Not Found'
      throw err;
    } else {
      const sql = "DELETE FROM `usuario` WHERE `id` = ?";
      const resultadoRemocao = await query(sql, [id]);
      console.log(`[${new Date().toISOString()}] - Usuário removido com sucesso!`);
      return resultadoRemocao;
    }
  } catch (err) {
    console.error(`[${new Date().toISOString()}] - Erro ao remover usuário: ${err.message}`);
    throw err;
  }
};

const atualizarUsuario = async (id, usuario) => {
  try {
    const resultadoConsulta = await consultarUsuarioPorId(id);
    if (resultadoConsulta === "Usuário não encontrado") {
      console.log(`[${new Date().toISOString()}] - Usuário não encontrado`);
      const err = new Error("Usuário não encontrado");
      err.status = 404; // Define o status do erro como 'Not Found'
      throw err;
    } else {
      const { nome, sobrenome, idade } = usuario;
      const { logradouro, municipio, estado, pais } = usuario.endereco;
      const sql =
        "UPDATE usuario SET nome = ?, sobrenome = ?, idade = ?, logradouro = ?, municipio = ?, estado = ?, pais = ? WHERE id = ?";
      const resultadoAtualizacao = await query(sql, [
        nome,
        sobrenome,
        idade,
        logradouro,
        municipio,
        estado,
        pais,
        id,
      ]);
      console.log(`[${new Date().toISOString()}] - Usuário atualizado com sucesso!`);
      return resultadoAtualizacao;
    }
  } catch (err) {
    console.error(`[${new Date().toISOString()}] - Erro ao atualizar usuário: ${err.message}`);
    throw err;
  }
};

module.exports = {
  criarUsuario,
  consultarUsuarioPorId,
  removerUsuario,
  atualizarUsuario,
};
