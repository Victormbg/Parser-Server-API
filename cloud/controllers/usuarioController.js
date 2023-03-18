const usuarioModel = require("../models/usuarioModel");

const CriarUsuario = async (request, response) => {
  const UsuarioCriado = await usuarioModel.CriarUsuario(request.body);
  return response.status(201).json({
    status: "Sucesso",
    id: UsuarioCriado,
    mensagem: "Usuario Criado com Sucesso",
  });
};

const ConsultarUsuarioPorID = async (request, response) => {
  const { id } = request.params;

  const usuario = await usuarioModel.ConsultarUsuarioPorID(id);

  if (usuario === "Usuário não encontrado") {
    return response.status(422).json({
      status: "Erro",
      mensagem: usuario,
    });
  } else {
    return response.status(200).json({
      status: "Sucesso",
      results: usuario,
    });
  }
};

const RemoverUsuario = async (request, response) => {
  const { id } = request.params;

  const resultado = await usuarioModel.RemoverUsuario(id);

  if (resultado === "Usuário não encontrado") {
    return response.status(422).json({
      status: "Erro",
      mensagem: resultado,
    });
  } else {
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Usuario Deletado com Sucesso",
    });
  }
};

const AtualizarUsuario = async (request, response) => {
  const { id } = request.params;

  const resultado = await usuarioModel.AtualizarUsuario(id, request.body);

  if (resultado === "Usuário não encontrado") {
    return response.status(422).json({
      status: "Erro",
      mensagem: resultado,
    });
  } else {
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Usuario Alterado com Sucesso",
    });
  }
};

module.exports = {
  CriarUsuario,
  ConsultarUsuarioPorID,
  RemoverUsuario,
  AtualizarUsuario,
};
