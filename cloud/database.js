var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'adminapi',
    password: 'testeapi20',
    database: 'bancodadosapi'
});

connection.connect(function (err) {
    if (err) {
        console.error('Erro de conexão do BD: ' + err.stack);
        return;
    }
    console.log('Conectado: ' + connection.threadId);
});

exports.databaseConnection = connection;