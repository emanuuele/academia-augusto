const { Pool } = require('pg');
const createTables = require("./create-table");
const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'academia_db',
        password: process.env.DB_PASSWORD,
        port: 5432, 
});

function execSQLQuery(sqlQry, res) {
  try {
    pool.query(sqlQry, (error, result, fields) => {
    if (error) {
      console.log({ euSouUmErro: error });
      return res.json(error);
    } else {
      return res?.json(result);
    }
    console.log("executou");
  });
  } catch (error) {
    console.log(error)
  }
}
createTables.createTableClients(pool).then(() => {
  console.log("Tabela clients criada com sucesso!");
  createTables.createTablePagamentos(pool).then(() => {
    console.log("Tabela pagamentos criada com sucesso!");
  }).catch((error) => {
    console.error("Erro ao criar tabela pagamentos:", error);
  });
}).catch((error) => {
  console.error("Erro ao criar tabela clients:", error);
});

module.exports = execSQLQuery;
