const query = require("./connection");

const verificarLoginExistente = async (idLinkedIn) => {
    console.log(`Verificando se o idLinkedIn ${idLinkedIn} existe na tabela de login...`);
    const [loginExistente] = await query('SELECT * FROM login WHERE idLinkedIn = ?', [idLinkedIn]);
    return loginExistente;
};

const validarIdLinkedIn = async (idLinkedIn) => {
    try {
        const result = await query(`
        SELECT *
        FROM usuario
        JOIN login ON usuario.login_idLinkedIn = login.idLinkedIn
        WHERE login.idLinkedIn = ?
      `, [idLinkedIn]);
        return result.length > 0;
    } catch (err) {
        console.error(`Erro ao validar idLinkedIn: ${err.message}`);
        throw err;
    }
};

const verificarEnderecoExistente = async (cep) => {
    console.log(`Verificando se o CEP ${cep} existe na tabela de endereço...`);
    const [enderecoExistente] = await query('SELECT * FROM endereco WHERE cep = ?', [cep]);
    return enderecoExistente;
};

const inserirEndereco = async (endereco) => {
    console.log(`Inserindo novo endereço ${JSON.stringify(endereco)} na tabela de endereço...`);
    try {
        const { insertId } = await query(
            'INSERT INTO endereco (cep, tipo, logradouro, bairro, estado, pais) VALUES (?, ?, ?, ?, ?, ?)',
            [endereco.cep, endereco.tipo, endereco.logradouro, endereco.bairro, endereco.estado, endereco.pais]
        );
        console.log(`Endereço ${insertId} inserido com sucesso!`);
        const [enderecoInserido] = await query('SELECT * FROM endereco WHERE cep = ?', [endereco.cep]);
        return enderecoInserido;
    } catch (error) {
        console.error(`Erro ao inserir endereço: ${error}`);
        return null;
    }
};

const inserirUsuario = async (usuario, enderecoCEP, dddFixo, numeroFixo, dddCelular, numeroCelular) => {

    const { idLinkedIn, dataNascimento, cpf, tipoConta, endereco } = usuario;

    console.log(`Inserindo novo usuário ${JSON.stringify(usuario)}, ${enderecoCEP}, ${dddFixo}, ${numeroFixo}, ${dddCelular}, ${numeroCelular} na tabela de usuário...`);
    const { insertId: usuarioId } = await query(
        'INSERT INTO usuario (cpf, tipoConta, dataNascimento, numeroEndereco, complementoEndereco, dddFixo, numeroFixo, dddCelular, numeroCelular, login_idLinkedIn, endereco_cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cpf, tipoConta, dataNascimento, endereco.numero, endereco.complemento, dddFixo, numeroFixo, dddCelular, numeroCelular, idLinkedIn, enderecoCEP]
    );
    console.log(`Usuário ${usuarioId} inserido com sucesso!`);
    return usuarioId;
}

const buscarUsuarioPorIdLinkedIn = async (idLinkedIn) => {
    const sql = `SELECT l.idLinkedIn, l.nome, l.sobrenome, l.foto, u.cpf, u.tipoConta, u.dataNascimento, u.numeroEndereco, 
        u.complementoEndereco, u.dddFixo, u.numeroFixo, u.dddCelular, u.numeroCelular, e.tipo, e.cep, e.logradouro, 
        e.bairro, e.estado, e.pais 
        FROM login l 
        JOIN usuario u ON l.idLinkedIn = u.login_idLinkedIn 
        JOIN endereco e ON u.endereco_cep = e.cep 
        WHERE l.idLinkedIn = ?`;
    const [rows] = await query(sql, [idLinkedIn]);
    return rows || null;
};

const removerUsuarioPorIdLinkedIn = async (idLinkedIn) => {
    const sql1 = `
      DELETE FROM usuario WHERE login_idLinkedIn = ?;
    `;
    const sql2 = `
      DELETE FROM login WHERE idLinkedIn = ?;
    `;
    const params = [idLinkedIn];

    try {
        const resultado1 = await query(sql1, params);
        const resultado2 = await query(sql2, params);
        return { resultado1, resultado2 };
    } catch (err) {
        console.error(`Erro ao remover usuário: ${err.message}`);
        throw err;
    }
};

const atualizarUsuarioPorIdLinkedIn = async (idLinkedIn, usuario, enderecoCEP, dddFixo, numeroFixo, dddCelular, numeroCelular) => {
    console.log(`Atualizando o usuário ${JSON.stringify(usuario)} ${enderecoCEP} ${dddFixo} ${numeroFixo} ${dddCelular} ${numeroCelular} na tabela de usuário e login...`);
    try {
        await atualizarUsuario(idLinkedIn, usuario, enderecoCEP, dddFixo, numeroFixo, dddCelular, numeroCelular);
        await atualizarLogin(idLinkedIn, usuario);
        console.log(`Tabelas de usuário e login atualizadas com sucesso!`);
    } catch (error) {
        console.error(`Erro ao atualizar usuário e login: ${error.message || error}`);
        throw error.message || error;
    }
};

const atualizarUsuario = async (idLinkedIn, usuario, enderecoCEP, dddFixo, numeroFixo, dddCelular, numeroCelular) => {
    try {
        const { cpf, tipoConta, dataNascimento, endereco } = usuario;
        const queryUsuario = `
            UPDATE usuario 
            SET cpf = ?, tipoConta = ?, dataNascimento = ?, 
                numeroEndereco = ?, complementoEndereco = ?, 
                dddFixo = ?, numeroFixo = ?, dddCelular = ?, 
                numeroCelular = ?, endereco_cep = ?
            WHERE login_idLinkedIn = ?
        `;
        console.log("TESTE: ", usuario)
        await query(queryUsuario, [
            cpf,
            tipoConta,
            dataNascimento,
            endereco.numero,
            endereco.complemento,
            dddFixo,
            numeroFixo,
            dddCelular,
            numeroCelular,
            enderecoCEP,
            idLinkedIn
        ]);
        console.log(`Usuário ${idLinkedIn} atualizado com sucesso na tabela de usuário!`);
    } catch (error) {
        console.error(`Erro ao atualizar usuário na tabela de usuário: ${error.message || error}`);
        throw error.message || error;
    }
};

const atualizarLogin = async (idLinkedIn, usuario) => {
    try {
        const { nome, sobrenome, foto } = usuario;
        const queryLogin = 'UPDATE login SET nome = ?, sobrenome = ?, foto = ? WHERE idLinkedIn = ?';
        await query(queryLogin, [nome, sobrenome, foto, idLinkedIn]);
        console.log(`Usuário ${idLinkedIn} atualizado com sucesso na tabela de login!`);
    } catch (error) {
        console.error(`Erro ao atualizar usuário na tabela de login: ${error.message || error}`);
        throw error.message || error;
    }
};

module.exports = {
    verificarLoginExistente,
    verificarEnderecoExistente,
    inserirEndereco,
    inserirUsuario,
    validarIdLinkedIn,
    buscarUsuarioPorIdLinkedIn,
    removerUsuarioPorIdLinkedIn,
    atualizarUsuarioPorIdLinkedIn
};
