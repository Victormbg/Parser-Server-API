const empresaModel = require("../models/empresaModel");

const CriarEmpresa = async (request, response) => {
  const EmpresaCriado = await empresaModel.CriarEmpresa(request.body);
  return response.status(201).json({
    status: "Sucesso",
    id: EmpresaCriado,
    mensagem: "Empresa Criado com Sucesso",
  });
};

const ConsultarEmpresaPorID = async (request, response) => {
  const { id } = request.params;

  const resultado = await empresaModel.ConsultarEmpresaPorID(id);

  if (resultado === "Empresa não encontrado") {
    return response.status(422).json({
      status: "Erro",
      mensagem: resultado,
    });
  } else {
    return response.status(200).json({
      status: "Sucesso",
      results: resultado,
    });
  }
};

const RemoverEmpresa = async (request, response) => {
  const { id } = request.params;

  const resultado = await empresaModel.RemoverEmpresa(id);

  if (resultado === "Empresa não encontrado") {
    return response.status(422).json({
      status: "Erro",
      mensagem: resultado,
    });
  } else {
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Empresa Deletada com Sucesso",
    });
  }
};

const AtualizarEmpresa = async (request, response) => {
  const { id } = request.params;

  const resultado = await empresaModel.AtualizarEmpresa(id, request.body);

  if (resultado === "Empresa não encontrado") {
    return response.status(422).json({
      status: "Erro",
      mensagem: resultado,
    });
  } else {
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Empresa Alterada com Sucesso",
    });
  }
};

module.exports = {
  CriarEmpresa,
  ConsultarEmpresaPorID,
  RemoverEmpresa,
  AtualizarEmpresa,
};
