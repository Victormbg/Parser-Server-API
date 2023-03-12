var connection = require('./database').databaseConnection;

app.get("/", async (req, res) => {
    res.status(404).json({
        "status": "Erro",
        "mensagem": "Pagina não encontrada",
    });
});

// Consulta por nome
app.get("/usuario/:nome", async (req, res) => {
    let nome = req.params.nome;
    if (!nome) {
        res.status(400).json({
            "status": "Erro",
            "mensagem": "Usuario não encontrado",
        });
    } else {
        connection.query(
            'SELECT * FROM `usuario` WHERE `nome` = ?',
            nome,
            function (error, results, fields) {
                if (error) {
                    res.status(500).json({
                        "status": "Erro",
                        "mensagem": error,
                    });
                } else {
                    res.json({
                        "status": "Sucesso",
                        results
                    });
                }
            }
        );
    }
});

// Consulta por id
app.get("/usuario/:id", async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(500).json({
            "status": "Erro",
            "mensagem": "Erro Desconhecido",
        });
    } else {
        connection.query(
            'SELECT * FROM `usuario` WHERE `id` = ?',
            id,
            function (error, results, fields) {
                if (error) {
                    res.status(500).json({
                        "status": "Erro",
                        "mensagem": error,
                    });
                } else {
                    res.json({
                        "status": "Sucesso",
                        results
                    });
                }
            }
        );
    }
});

// Criar Usuario
app.post('/usuario', (req, res) => {
    // Pegando os campos do BODY JSON DE REQUEST
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var pais = req.body.pais;
    if (pais != "Brasil") {
        res.status(422).json({
            "status": "Erro",
            "mensagem": "Apenas aceito Brasil como pais",
        });
    }
    var municipio = req.body.municipio;
    var estado = req.body.estado;
    var idade = req.body.idade;
    if (idade < 18) {
        res.status(422).json({
            "status": "Erro",
            "mensagem": "Menor de Idade",
        });
        return;
    }

    // Salvar Usuario no BD
    connection.query('INSERT INTO usuario SET ?', { nome: nome, sobrenome: sobrenome, pais: pais, municipio: municipio, estado: estado, idade: idade }, function (error, results, fields) {
        if (error) {
            res.status(500).json({
                "status": "Erro",
                "mensagem": error,
            });
        } else {
            res.json({
                "status": "Sucesso",
                "mensagem": "Usuario criado com sucesso",
            });
        }
    });
    connection.end();
});

// Deletar por id
app.delete("/usuario/:id", async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(500).json({
            "status": "Erro",
            "mensagem": "Erro Desconhecido",
        });
    } else {
        connection.query('DELETE FROM usuario WHERE id = ' + id, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    "status": "Erro",
                    "mensagem": error,
                });
            } else {
                res.json({
                    "status": "Sucesso",
                    "mensagem": "Usuario deletado com sucesso",
                });
            }
        })
    }
});