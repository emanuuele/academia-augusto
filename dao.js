const mysql = require("mysql2");
const createTables = require("./create-table");
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "academia",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
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
createTables.createTableClients(pool);
createTables.createTablePagamentos(pool);

module.exports = execSQLQuery;
