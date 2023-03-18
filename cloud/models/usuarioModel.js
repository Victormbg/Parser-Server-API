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

// FALTA MELHORAR O RETORNO
const ConsultarUsuarioPorID = async (id) => {
  const [rows, fields] = await connection.execute(
    "SELECT * FROM `usuario` WHERE `id` = ?",
    [id],
    async function (err, results, fields) {
      if (err) {
        res.status(500).json({
          status: "Erro",
          mensagem: err,
        });
      } else {
        if (results.length === 0) {
          res.status(422).json({
            status: "Erro",
            mensagem: "Usuário não encontrado",
          });
        } else {
          console.log(results);
        }
      }
    }
  );
  return rows;
};

module.exports = {
  CriarUsuario,
  ConsultarUsuarioPorID,
};