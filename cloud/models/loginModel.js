const query = require("./connection");

const criarLogin = async (login) => {
    const { idLinkedIn, nome, sobrenome, foto } = login;

    const sql =
        "INSERT INTO login(idLinkedIn, nome, sobrenome, foto) VALUES (?, ?, ?, ?)";

    try {
        const [rows, _] = await query(
            'SELECT COUNT(*) AS count FROM login WHERE idLinkedIn = ?',
            [idLinkedIn]
        );
        console.log("rows: ", rows)
        if (rows && typeof rows === 'object' && 'count' in rows && rows.count > 0) {
            console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao criar login: O idLinkedIn ${idLinkedIn} já existe na tabela login`);
            const err = new Error(`O idLinkedIn ${idLinkedIn} já existe na tabela login`);
            err.status = 409; // Define o código de status HTTP como 409 (Conflito)
            throw err;
        } else {
            const result = await query(sql, [
                idLinkedIn,
                nome,
                sobrenome,
                foto
            ]);
            console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Login criado com sucesso!`);
            return result.insertId;
        }
    } catch (err) {
        console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao criar login: ${err.message}`);
        throw err;
    }
};

const consultarLoginPorId = async (idLinkedIn) => {
    console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Consultando idLinkedIn: ${idLinkedIn}`);
    const sql = "SELECT * FROM `login` WHERE `idLinkedIn` = ?";
    try {
        const [rows, fields] = await query(sql, [idLinkedIn]);
        if (!rows || rows.length === 0) { // Verifica se rows é indefinidLinkedIno ou vazio
            console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Login de idLinkedIn ${idLinkedIn} não encontrado`);
            const err = new Error(`idLinkedIn ${idLinkedIn} não encontrado`);
            err.status = 404; // Define o status do erro como 'Not Found'
            throw err;
        } else {
            console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Login de idLinkedIn ${idLinkedIn} encontrado`);
            console.log(rows)
            const loginFormatado = {
                idLinkedIn: rows.idLinkedIn || null,
                nome: rows.nome || null,
                sobrenome: rows.sobrenome || null,
                foto: rows.foto || null,
            };
            return loginFormatado;
        }
    } catch (err) {
        console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao consultar login de idLinkedIn ${idLinkedIn}: ${err.message}`);
        throw err;
    }
};

const removerLogin = async (idLinkedIn) => {
    try {
        console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Iniciando remoção de login com idLinkedIn ${idLinkedIn}`);
        const resultadoConsulta = await consultarLoginPorId(idLinkedIn);
        if (resultadoConsulta === `idLinkedIn ${idLinkedIn} não encontrado`) {
            console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - idLinkedIn não encontrado`);
            const err = new Error(`idLinkedIn ${idLinkedIn} não encontrado`);
            err.status = 404; // Define o status do erro como 'Not Found'
            throw err;
        } else {
            const sql = "DELETE FROM `login` WHERE `idLinkedIn` = ?";
            const resultadoRemocao = await query(sql, [idLinkedIn]);
            console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Login removido com sucesso!`);
            return resultadoRemocao;
        }
    } catch (err) {
        console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao remover login: ${err.message}`);
        throw err;
    }
};

const atualizarLogin = async (idLinkedIn, login) => {
    try {
        const resultadoConsulta = await consultarLoginPorId(idLinkedIn);
        if (resultadoConsulta === `idLinkedIn ${idLinkedIn} não encontrado`) {
            console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - idLinkedIn ${idLinkedIn} não encontrado`);
            const err = new Error(`idLinkedIn ${idLinkedIn} não encontrado`);
            err.status = 404; // Define o status do erro como 'Not Found'
            throw err;
        } else {
            const { nome, sobrenome, foto } = login;
            const sql =
                "UPDATE login SET nome = ?, sobrenome = ?, foto = ? WHERE idLinkedIn = ?";
            const resultadoAtualizacao = await query(sql, [
                nome,
                sobrenome,
                foto,
                idLinkedIn,
            ]);
            console.log(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Login atualizado com sucesso!`);
            return resultadoAtualizacao;
        }
    } catch (err) {
        console.error(`[${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}] - Erro ao atualizar login: ${err.message}`);
        throw err;
    }
};

module.exports = {
    criarLogin,
    consultarLoginPorId,
    removerLogin,
    atualizarLogin,
};
