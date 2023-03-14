var connection = require("../database").databaseConnection;

// ERRO NESSE FUNCTION
function GetJsonRequest(req) {
  var mensagem = null;
  const campos = null;
  const { nome, sobrenome, idade } = req.body;
  if (idade < 18) {
    mensagem = "Usuário menor de idade";
    return mensagem;
  }
  const { logradouro, municipio, estado, pais } = req.body.endereco;
  campos = { nome, sobrenome, idade, logradouro, municipio, estado, pais };
  return campos;
}

// Consulta Usuario por query
/*
app.get("/usuario", async (req, res) => {
  let nome = req.params.nome;
  let sobrenome = req.params.sobrenome;
  let idade = req.params.idade;
  let pais = req.params.pais;
  connection.query(
    "SELECT * FROM `usuario` WHERE `nome` = ?",
    nome,
    function (error, results, fields) {
      if (error) {
        res.status(500).json({
          status: "Erro",
          mensagem: error,
        });
      } else {
        res.json({
          status: "Sucesso",
          results,
        });
      }
    }
  );
  connection.end();
});
*/
// Consulta Usuario por id
app.get("/usuario/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(500).json({
      status: "Erro",
      mensagem: "Erro Desconhecido",
    });
  } else {
    connection.query(
      "SELECT * FROM `usuario` WHERE `id` = ?",
      id,
      function (error, results, fields) {
        if (error) {
          res.status(500).json({
            status: "Erro",
            mensagem: error,
          });
        } else {
          if (results.length === 0) {
            res.status(422).json({
              status: "Erro",
              mensagem: "Usuário não encontrado",
            });
          } else {
            res.json({
              status: "Sucesso",
              results,
            });
          }
        }
      }
    );
    //connection.end();
  }
});

// Criar Usuario
app.post("/usuario", (req, res) => {
  try {
    // Pegando os campos do BODY JSON DE REQUEST
    const { nome, sobrenome, idade } = req.body;
    if (idade < 18) {
      res.status(422).json({
        status: "Erro",
        mensagem: "Usuário menor de idade",
      });
      return;
    }
    const { logradouro, municipio, estado, pais } = req.body.endereco;
    // Salvar Usuario no BD
    connection.query(
      "INSERT INTO usuario SET ?",
      {
        nome: nome,
        sobrenome: sobrenome,
        idade: idade,
        logradouro: logradouro,
        municipio: municipio,
        estado: estado,
        pais: pais,
      },
      function (error, results, fields) {
        if (error) {
          res.status(500).json({
            status: "Erro",
            mensagem: error,
          });
        } else {
          res.status(201).json({
            status: "Sucesso",
            id: results.insertId,
            mensagem: "Usuario Criado com Sucesso",
          });
        }
      }
    );
    //connection.end();
  } catch (error) {
    res.status(500).json({
      status: "Erro",
      mensagem: error,
    });
  }
});

// Alterar Usuario por Id
app.put("/usuario/:id", (req, res) => {
  try {
    // Recuperando o ID
    let id = req.params.id;
    if (!id) {
      res.status(500).json({
        status: "Erro",
        mensagem: "Erro Desconhecido",
      });
    } else {
      const { nome, sobrenome, idade } = req.body;
      if (idade < 18) {
        res.status(422).json({
          status: "Erro",
          mensagem: "Usuário menor de idade",
        });
        return;
      }
      const { logradouro, municipio, estado, pais } = req.body.endereco;
      // Pegando os campos do BODY JSON DE REQUEST
      /*
      ERRO NESSE METODO
      let resultado = GetJsonRequest(req);
      if (typeof resultado === String) {
        res.status(422).json({
          status: "Erro",
          mensagem: resultado,
        });
      } else {
      */
      // Alterando Usuario no BD
      connection.query(
        "UPDATE usuario SET nome = ?, sobrenome = ?, idade = ?, logradouro = ?, municipio = ?, estado = ?, pais = ? WHERE id = ?",
        [nome, sobrenome, idade, logradouro, municipio, estado, pais, id],
        function (error, results, fields) {
          if (error) {
            res.status(500).json({
              status: "Erro",
              mensagem: error,
            });
          } else {
            res.json({
              status: "Sucesso",
              mensagem: "Usuario alterado com sucesso",
            });
          }
        }
      );
      //connection.end();
      //}
    }
  } catch (err) {
    res.status(500).json({
      status: "Erro",
      mensagem: err.message,
    });
  }
});

// Deletar Usuario por id
app.delete("/usuario/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(500).json({
      status: "Erro",
      mensagem: "Erro Desconhecido",
    });
  } else {
    connection.query(
      "DELETE FROM usuario WHERE id = " + id,
      function (error, results, fields) {
        if (error) {
          res.status(500).json({
            status: "Erro",
            mensagem: error,
          });
        } else {
          res.json({
            status: "Sucesso",
            mensagem: "Usuario Deletado com Sucesso",
          });
        }
      }
    );
    //connection.end();
  }
});
