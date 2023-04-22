const loginModel = require("../models/loginModel");

const CriarLogin = async (request, response, next) => {
  try {
    const LoginCriado = await loginModel.criarLogin(request.body);
    console.log(`[${new Date().toISOString()}] - Login criado com sucesso: ${LoginCriado}`);
    return response.status(201).json({
      status: "Sucesso",
      mensagem: "Login criado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const ConsultarLoginPorID = async (request, response, next) => {
  try {
    const { id } = request.params;
    const login = await loginModel.consultarLoginPorId(id);
    console.log(`[${new Date().toISOString()}] - Login consultado com sucesso: ${id}`);
    return response.status(200).json({
      status: "Sucesso",
      data: login,
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] - Erro ao consultar usuário: ${error}`);
    next(error);
  }
};

const RemoverLogin = async (request, response, next) => {
  try {
    const { id } = request.params;
    const resultado = await loginModel.removerLogin(id);
    console.log(`[${new Date().toISOString()}] - Login removido com sucesso: ${id}`);
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Login deletado com sucesso",
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] - Erro ao remover usuário: ${error}`);
    next(error);
  }
};

const AtualizarLogin = async (request, response, next) => {
  try {
    const { id } = request.params;
    const resultado = await loginModel.atualizarLogin(id, request.body);
    console.log(`[${new Date().toISOString()}] - Login atualizado com sucesso: ${id}`);
    return response.status(200).json({
      status: "Sucesso",
      mensagem: "Login atualizado com sucesso",
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] - Erro ao atualizar usuário: ${error}`);
    next(error);
  }
};

module.exports = {
  CriarLogin,
  ConsultarLoginPorID,
  RemoverLogin,
  AtualizarLogin,
};
