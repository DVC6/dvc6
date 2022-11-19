var database = require("../database/config");

function enviar(starvalue, texto, idFuncionario) {
  console.log(
    "ACESSEI O FEEDBACK MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviar():",
    starvalue,
    texto,
    idFuncionario
  );
  console.log(`nota: ${starvalue} \t text: ${texto}`);
  var instrucao = `
        IF NOT EXISTS (SELECT * FROM [dbo].[feedback] WHERE fkfuncionario = ${idFuncionario})
        INSERT INTO [dbo].[feedback] (nota, texto, fkfuncionaRio) VALUES (${starvalue}, '${texto}', ${idFuncionario})
        ELSE 
        BEGIN
        DELETE FROM [dbo].[feedback] WHERE fkfuncionario = ${idFuncionario}
        INSERT INTO [dbo].[feedback] (nota, texto, fkfuncionaRio) VALUES (${starvalue}, '${texto}', ${idFuncionario})
        END 
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  enviar,
};
