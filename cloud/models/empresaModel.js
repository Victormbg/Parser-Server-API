const connection = require("./connection");

const CriarEmpresa = async (empresa) => {
  const { NomeEmpresa, RazaoSocial, cnpj } = empresa;
  const { logradouro, municipio, estado, pais } = empresa.endereco;
  const query =
    "INSERT INTO empresa (NomeEmpresa, RazaoSocial, cnpj, logradouro, municipio, estado, pais) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const [resultado] = await connection.execute(
    query,
    [NomeEmpresa, RazaoSocial, cnpj, logradouro, municipio, estado, pais],
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
  return resultado.insertId;
};

const ConsultarEmpresaPorID = async (id) => {
  const [rows, fields] = await connection.execute(
    "SELECT * FROM `empresa` WHERE `id` = ?",
    [id],
    async function (err, results, fields) {
      if (err) {
        return err;
      }
    }
  );

  if (rows.length === 0) {
    return "Empresa não encontrado";
  } else {
    return rows;
  }
};

const RemoverEmpresa = async (id) => {
  // CONSULTAR PARA SABER SE EMPRESA EXISTE
  const [rows, fields] = await connection.execute(
    "SELECT * FROM `empresa` WHERE `id` = ?",
    [id],
    async function (err, results, fields) {
      if (err) {
        return err;
      }
    }
  );
  // VERIFICAR SE O EMPRESA EXISTE ANTES DE REMOVER O EMPRESA
  if (rows.length === 0) {
    return "Empresa não encontrado";
  } else {
    const remover = await connection.execute(
      "DELETE FROM `empresa` WHERE `id` = ?",
      [id],
      async function (err, results, fields) {
        if (err) {
          return err;
        }
      }
    );
    return remover;
  }
};

const AtualizarEmpresa = async (id, empresa) => {
  // CONSULTAR PARA SABER SE EMPRESA EXISTE
  const [rows, fields] = await connection.execute(
    "SELECT * FROM `empresa` WHERE `id` = ?",
    [id],
    async function (err, results, fields) {
      if (err) {
        return err;
      }
    }
  );
  // VERIFICAR SE O EMPRESA EXISTE ANTES DE ALTERAR O EMPRESA
  if (rows.length === 0) {
    return "Empresa não encontrado";
  } else {
    const { NomeEmpresa, RazaoSocial, cnpj } = empresa;
    const { logradouro, municipio, estado, pais } = empresa.endereco;
    const query =
      "UPDATE empresa SET NomeEmpresa = ?, RazaoSocial = ?, cnpj = ?, logradouro = ?, municipio = ?, estado = ?, pais = ? WHERE id = ?";
    const [atualizar] = await connection.execute(
      query,
      [NomeEmpresa, RazaoSocial, cnpj, logradouro, municipio, estado, pais, id],
      async function (err, results, fields) {
        if (err) {
          return err;
        }
      }
    );
    return atualizar;
  }
};

module.exports = {
  CriarEmpresa,
  ConsultarEmpresaPorID,
  RemoverEmpresa,
  AtualizarEmpresa,
};
