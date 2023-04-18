const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

const query = async (sql, values) => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Conexão com o banco de dados estabelecida.");
  } catch (err) {
    console.error("Erro ao estabelecer conexão com o banco de dados:", err);
    throw err;
  }

  try {
    const [rows] = await connection.query(sql, values);
    return rows;
  } catch (err) {
    console.error(`Erro ao executar query: ${sql}`);
    throw err;
  } finally {
    connection.release();
    console.log("Conexão com o banco de dados finalizada.");
  }
};

module.exports = query;

