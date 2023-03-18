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
  const usuario = await usuarioModel.ConsultarUsuarioPorID(request.params.id);

  return response.status(200).json({
    status: "Sucesso",
    results: usuario,
  });
};

module.exports = {
  CriarUsuario,
  ConsultarUsuarioPorID,
};
