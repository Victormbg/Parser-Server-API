const connection = require("./connection");

const CriarUsuario = async (usuario) => {
  const { nome, sobrenome, idade } = usuario;
  const { logradouro, municipio, estado, pais } = usuario.endereco;
  const query =
    "INSERT INTO usuario(nome,sobrenome,idade,logradouro,municipio,estado,pais) VALUES(?,?,?,?,?,?,?)";
  const [UsuarioCriado] = await connection.execute(
    query,
    [nome, sobrenome, idade, logradouro, municipio, estado, pais],
    async function (err, results, fields) {
      if (err) {
        res.status(500).json({
          status: "Erro",
          mensagem: err,
        });
      } else {
        console.log(results);
      }
    }
  );
  return UsuarioCriado.insertId;
};

const ConsultarUsuarioPorID = async (id) => {
  const [rows, fields] = await connection.execute(
    "SELECT * FROM `usuario` WHERE `id` = ?",
    [id],
    async function (err, results, fields) {
      if (err) {
        return err;
      }
    }
  );

  if (rows.length === 0) {
    return "Usuário não encontrado";
  } else {
    return rows;
  }
};

const RemoverUsuario = async (id) => {
  const remover = await connection.execute(
    "DELETE FROM `usuario` WHERE `id` = ?",
    [id],
    async function (err, results, fields) {
      if (err) {
        return err;
      }
    }
  );
  return remover;
};

const AtualizarUsuario = async (id, usuario) => {
  const { nome, sobrenome, idade } = usuario;
  const { logradouro, municipio, estado, pais } = usuario.endereco;
  const query =
    "UPDATE usuario SET nome = ?, sobrenome = ?, idade = ?, logradouro = ?, municipio = ?, estado = ?, pais = ? WHERE id = ?";
  const [atualizar] = await connection.execute(
    query,
    [nome, sobrenome, idade, logradouro, municipio, estado, pais, id],
    async function (err, results, fields) {
      if (err) {
        return err;
      }
    }
  );
  return atualizar;
};

module.exports = {
  CriarUsuario,
  ConsultarUsuarioPorID,
  RemoverUsuario,
  AtualizarUsuario,
};
