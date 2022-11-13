var database = require("../database/config");

function periodoSimples(dia, mes, ano, idTotem) {
  console.log(
    "ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function periodoSimples():",
    dia,
    mes,
    ano,
    idTotem
  );
  var instrucaoSql = `
      select nome_maquina, localizacao, 
      format(data_hora_atual, 'dd-MM-yyyy') as dia, 
      format(data_hora_atual, 'hh:mm:ss') as hora, 
      consumo from leitura 
      join componente on fkcomponente = id_componente 
      join totem on fktotem = id_totem where 
      DATEPART(year, data_hora_atual) = '${ano}' 
      and DATEPART(month, data_hora_atual) = '${mes}' 
      and DATEPART(day, data_hora_atual) = '${dia}' 
      and totem.id_totem = ${idTotem};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  periodoSimples,
};
