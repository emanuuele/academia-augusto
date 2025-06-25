function createTableClients(conn) {
  const sql =
    `CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(150) NOT NULL,
      idade INT NOT NULL,
      altura DOUBLE PRECISION NOT NULL,
      peso DOUBLE PRECISION NOT NULL,
      nascimento VARCHAR(10) NOT NULL,
      ultimoPagamento VARCHAR(10),
      vencimento VARCHAR(10),
      ativo VARCHAR(1)
    );`;
  return conn.query(sql);
}
function createTablePagamentos(conn) {
  const sql =
    `CREATE TABLE IF NOT EXISTS pagamentos (
      id SERIAL PRIMARY KEY,
      valor DOUBLE PRECISION NOT NULL,
      ultimoPagamento VARCHAR(10) NOT NULL,
      id_client INT NOT NULL,
      CONSTRAINT id_cliente_fk FOREIGN KEY (id_client)
        REFERENCES clients(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    );`;
  return conn.query(sql);
}

module.exports = { createTableClients, createTablePagamentos };
