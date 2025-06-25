const express = require("express");
const execSQLQuery = require("../dao");

const router = express.Router();

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

router.get("/pagamentos", (req, res) => {
  execSQLQuery(
    `SELECT pagamentos.id, 
            clients.nome, 
            'R$ ' || REPLACE(TO_CHAR(pagamentos.valor, 'FM9999990.00'), '.', ',') AS valor,
            TO_CHAR(TO_DATE(pagamentos.ultimoPagamento, 'YYYY-MM-DD'), 'DD/MM/YYYY') AS ultimoPagamento,
            TO_CHAR(TO_DATE(clients.vencimento, 'YYYY-MM-DD'), 'DD/MM/YYYY') AS vencimento 
     FROM pagamentos 
     LEFT JOIN clients ON pagamentos.id_client = clients.id`, 
    res
  );
});

router.post("/pagamentos/", (req, res) => {
  const {
    pagamento: { valor, id_cliente },
  } = req.body;
  console.log('pagamento 1');
  let vencimento;
  let vencimentoString;

  vencimento = addDays(new Date(), valor >= 1000 ? 365 : 30);
  vencimentoString = vencimento.toISOString().slice(0, 10);  

  execSQLQuery(
    `INSERT INTO pagamentos(valor, ultimoPagamento, id_client) VALUES (${valor}, '${new Date().toISOString().slice(0, 10)}', ${id_cliente});` +
      `UPDATE clients SET vencimento = '${vencimentoString}' where id= ${id_cliente};`,
    res
  );
});

module.exports = router;
