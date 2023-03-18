const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "db4free.net",
  user: "adminapi",
  password: "testeapi20",
  database: "bancodadosapi",
});
/*
connection.connect(function (err) {
  if (err) {
    console.error("Erro de conexão do BD: " + err.stack);
    return;
  }
  console.log("Sucesso ao conectar ao banco de dados. threadId: " + connection.threadId);
});
*/
module.exports = connection;
