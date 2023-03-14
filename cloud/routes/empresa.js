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
app.get("/empresa/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: "Erro",
      mensagem: "Id mal formatado",
    });
  } else {
    connection.query(
      "SELECT * FROM `empresa` WHERE `id` = ?",
      id,
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
    //connection.end();
  }
});

// Criar Empresa
app.post("/empresa", (req, res) => {
  // Pegando os campos do BODY JSON DE REQUEST
  var nomeEmpresa = req.body.NomeEmpresa;
  var razaoSocial = req.body.RazaoSocial;
  var cnpj = req.body.cnpj;
  var logradouro = req.body.endereco.logradouro;
  var municipio = req.body.endereco.municipio;
  var estado = req.body.endereco.estado;
  var pais = req.body.endereco.pais;

  // Salvar Empresa no BD
  connection.query(
    "INSERT INTO empresa SET ?",
    {
      nomeEmpresa: nomeEmpresa,
      razaoSocial: razaoSocial,
      cnpj: cnpj,
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
          mensagem: "Empresa Criado com Sucesso",
        });
      }
    }
  );
  //connection.end();
});

// Alterar Empresa por Id
app.put("/empresa/:id", (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: "Erro",
      mensagem: "Id mal formatado",
    });
  } else {
    // Pegando os campos do BODY JSON DE REQUEST
    var nomeEmpresa = req.body.NomeEmpresa;
    var razaoSocial = req.body.RazaoSocial;
    var cnpj = req.body.cnpj;
    var logradouro = req.body.endereco.logradouro;
    var municipio = req.body.endereco.municipio;
    var estado = req.body.endereco.estado;
    var pais = req.body.endereco.pais;
    // Alterando Empresa no BD
    connection.query(
      "UPDATE empresa SET nomeEmpresa = ?, razaoSocial = ?, cnpj = ?, logradouro = ?, municipio = ?, estado = ?, pais = ? WHERE id = ?",
      [nomeEmpresa, razaoSocial, cnpj, logradouro, municipio, estado, pais, id],
      function (error, results, fields) {
        if (error) {
          res.status(500).json({
            status: "Erro",
            mensagem: error,
          });
        } else {
          res.json({
            status: "Sucesso",
            mensagem: "Empresa Alterado com Sucesso",
          });
        }
      }
    );
    //connection.end();
  }
});

// Deletar Empresa por id
app.delete("/empresa/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: "Erro",
      mensagem: "Id mal formatado",
    });
  } else {
    connection.query(
      "DELETE FROM empresa WHERE id = " + id,
      function (error, results, fields) {
        if (error) {
          res.status(500).json({
            status: "Erro",
            mensagem: error,
          });
        } else {
          res.json({
            status: "Sucesso",
            mensagem: "Empresa Deletada com Sucesso",
          });
        }
      }
    );
    //connection.end();
  }
});
