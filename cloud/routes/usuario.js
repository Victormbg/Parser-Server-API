var connection = require("../database").databaseConnection;

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
          res.json({
            status: "Sucesso",
            results,
          });
        }
      }
    );
    //connection.end();
  }
});

// Criar Usuario
app.post("/usuario", (req, res) => {
  // Pegando os campos do BODY JSON DE REQUEST
  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var idade = req.body.idade;
  if (idade < 18) {
    res.status(422).json({
      status: "Erro",
      mensagem: "Menor de Idade",
    });
    return;
  }
  var logradouro = req.body.endereco.logradouro;
  var municipio = req.body.endereco.municipio;
  var estado = req.body.endereco.estado;
  var pais = req.body.endereco.pais;
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
        res.json({
          status: "Sucesso",
          mensagem: "Usuario Criado com Sucesso",
        });
      }
    }
  );
  //connection.end();
});

// Alterar Usuario por Id
app.put("/usuario/:id", (req, res) => {
  // Recuperando o ID
  let id = req.params.id;
  if (!id) {
    res.status(500).json({
      status: "Erro",
      mensagem: "Erro Desconhecido",
    });
  } else {
    // Pegando os campos do BODY JSON DE REQUEST
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var idade = req.body.idade;
    if (idade < 18) {
      res.status(422).json({
        status: "Erro",
        mensagem: "Menor de Idade",
      });
      return;
    }
    var logradouro = req.body.endereco.logradouro;
    var municipio = req.body.endereco.municipio;
    var estado = req.body.endereco.estado;
    var pais = req.body.endereco.pais;
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
