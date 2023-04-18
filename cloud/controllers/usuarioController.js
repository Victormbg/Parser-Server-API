const usuarioModel = require("../models/usuarioModel");

const CriarUsuario = async (request, response, next) => {
  try {
    const UsuarioCriado = await usuarioModel.criarUsuario(request.body);
    console.log(`[${new Date().toISOString()}] - Usuário criado com sucesso: ${UsuarioCriado}`);
    return response.status(201).json({
      status: "Sucesso",
      id: UsuarioCriado,
      mensagem: "Usuário criado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const ConsultarUsuarioPorID = async (request, response, next) => {
  try {
    const { id } = request.params;
    const usuario = await usuarioModel.consultarUsuarioPorId(id);
    console.log(`[${new Date().toISOString()}] - Usuário consultado com sucesso: ${id}`);
    return response.status(200).json({
      status: "Sucesso",
      data: usuario,
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] - Erro ao consultar usuário: ${error}`);
    next(error);
  }
};

const RemoverUsuario = async (request, response, next) => {
  try {
    const { id } = request.params;
    const resultado = await usuarioModel.removerUsuario(id);
    console.log(`[${new Date().toISOString()}] - Usuário removido com sucesso: ${id}`);
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Usuário deletado com sucesso",
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] - Erro ao remover usuário: ${error}`);
    next(error);
  }
};

const AtualizarUsuario = async (request, response, next) => {
  try {
    const { id } = request.params;
    const resultado = await usuarioModel.atualizarUsuario(id, request.body);
    console.log(`[${new Date().toISOString()}] - Usuário atualizado com sucesso: ${id}`);
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Usuário atualizado com sucesso",
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] - Erro ao atualizar usuário: ${error}`);
    next(error);
  }
};

module.exports = {
  CriarUsuario,
  ConsultarUsuarioPorID,
  RemoverUsuario,
  AtualizarUsuario,
};
