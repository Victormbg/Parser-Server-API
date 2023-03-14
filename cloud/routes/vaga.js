var connection = require("../database").databaseConnection;

// Consulta Empresa por nome
/*
app.get("/empresa/:nome", async (req, res) => {
  let nome = req.params.nome;
  if (!nome) {
    res.status(400).json({
      status: "Erro",
      mensagem: "Nome mal formatado",
    });
  } else {
    connection.query(
      "SELECT * FROM `empresa` WHERE `nome` = ?",
      nome,
      function (error, results, fields) {
        if (error) {
          res.status(422).json({
            status: "Erro",
            mensagem: "Empresa não encontrado",
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
  }
});
*/
// Consulta Empresa por id
app.get("/vaga/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: "Erro",
      mensagem: "Id mal formatado",
    });
  } else {
    connection.query(
      "SELECT * FROM `vaga` WHERE `id` = ?",
      id,
      function (error, results, fields) {
        if (error) {
          res.status(422).json({
            status: "Erro",
            mensagem: "Vaga não encontrado",
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
  }
});

// Criar Vaga
app.post("/vaga", (req, res) => {
  // Pegando os campos do BODY JSON DE REQUEST
  var nomeVaga = req.body.nomeVaga;
  var descricao = req.body.descricao;
  var salario = req.body.salario;
  // Salvar Vaga no BD
  connection.query(
    "INSERT INTO vaga SET ?",
    {
      nomeVaga: nomeVaga,
      descricao: descricao,
      salario: salario,
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
          mensagem: "Vaga Criado com Sucesso",
        });
      }
    }
  );
  connection.end();
});

// Alterar Vaga por Id
app.put("/vaga/:id", (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: "Erro",
      mensagem: "Id mal formatado",
    });
  } else {
    // Pegando os campos do BODY JSON DE REQUEST
    var nomeVaga = req.body.nomeVaga;
    var descricao = req.body.descricao;
    var salario = req.body.salario;
    // Alterando Vaga no BD
    connection.query(
      "UPDATE vaga SET nomeVaga = ?, descricao = ?, salario = ? WHERE id = ?",
      [nomeVaga, descricao, salario, id],
      function (error, results, fields) {
        if (error) {
          res.status(500).json({
            status: "Erro",
            mensagem: error,
          });
        } else {
          res.json({
            status: "Sucesso",
            mensagem: "Vaga Alterado com Sucesso",
          });
        }
      }
    );
    connection.end();
  }
});

// Deletar Vaga por id
app.delete("/vaga/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: "Erro",
      mensagem: "Id mal formatado",
    });
  } else {
    connection.query(
      "DELETE FROM vaga WHERE id = " + id,
      function (error, results, fields) {
        if (error) {
          res.status(500).json({
            status: "Erro",
            mensagem: error,
          });
        } else {
          res.json({
            status: "Sucesso",
            mensagem: "Vaga Deletada com Sucesso",
          });
        }
      }
    );
    connection.end();
  }
});
