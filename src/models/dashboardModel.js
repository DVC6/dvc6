var database = require("../database/config");

function buscarUltimaData(idTotem) {
  instrucaoSql = `select top 1
    DATEPART(DAY, data_hora_atual) as 'dia'
                            from leitura
                            JOIN componente ON fkComponente = id_componente
                            JOIN totem ON fkTotem = id_totem
                            where id_totem = ${idTotem}
                            order by id_leitura desc;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasRAMKPI(idTotem) {
  instrucaoSql = `select top 1
                        DATEPART(HOUR,data_hora_atual) as 'hora' ,
                        DATEPART(MINUTE,data_hora_atual) as 'minuto',
                        DATEPART(SECOND,data_hora_atual) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = id_componente
                        JOIN totem ON fkTotem = id_totem
                        where id_totem = ${idTotem}
                        AND tipoComponente = 'RAM'
                        order by idLeitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasCPUKPI(idTotem) {
  instrucaoSql = `select top 1
                        DATEPART(HOUR,data_hora_atual) as 'hora' ,
                        DATEPART(MINUTE,data_hora_atual) as 'minuto',
                        DATEPART(SECOND,data_hora_atual) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = id_componente
                        JOIN totem ON fkTotem = id_totem
                        where id_totem = ${idTotem}
                        AND tipoComponente = 'CPU'
                        order by idLeitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasDisco(idTotem) {
  instrucaoSql = `select top 1
                        DATEPART(HOUR,data_hora_atual) as 'hora' ,
                        DATEPART(MINUTE,data_hora_atual) as 'minuto',
                        DATEPART(SECOND,data_hora_atual) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = id_componente
                        JOIN totem ON fkTotem = id_totem
                        where id_totem = ${idTotem}
                        AND tipo = 'DISCO'
                        order by idLeitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasRAM(idTotem) {
  instrucaoSql = `select top 7
                    DATEPART(HOUR,data_hora_atual) as 'hora' ,
                    DATEPART(MINUTE,data_hora_atual) as 'minuto',
                    DATEPART(SECOND,data_hora_atual) as 'segundo',
                    consumo
                    from leitura
                    JOIN componente ON fkComponente = id_componente
                    JOIN totem ON fkTotem = id_totem
                    where id_totem = ${idTotem}
                    AND tipo = 'RAM'
                    order by idLeitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasCPU(idTotem) {
  instrucaoSql = `select top 7
                        DATEPART(HOUR,data_hora_atual) as 'hora' ,
                        DATEPART(MINUTE,data_hora_atual) as 'minuto',
                        DATEPART(SECOND,data_hora_atual) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = id_componente
                        JOIN totem ON fkTotem = id_totem
                        where id_totem = ${idTotem}
                        AND tipo = 'CPU'
                        order by idLeitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarTotens(idHospital) {
  console.log("Listando todos os totens cadastrados em seu Hospital");
  var instrucao = `
        SELECT 
            id_totem,
            nome_maquina
        FROM totem
        WHERE fkHospital = '${idHospital}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarFuncionarios(idHospital) {
  console.log("Listando todos os funcionários cadastrados para o seu Hospital");
  var instrucao = `
        SELECT 
            id_funcionario,
            nome_funcionario,
            cargo,
            email
        FROM funcionario
        WHERE fkhospital = '${idHospital}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarUsuario(nome, senha, email, cargo, idHospital) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():",
    nome,
    senha,
    email,
    cargo,
    idHospital
  );
  var instrucao = `
        INSERT INTO funcionario (nome_funcionario, senha, email, cargo, fkHospital
             ) VALUES ('${nome}','${senha}','${email}','${cargo}', '${idHospital}');`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deletarUsuario(idFuncionario) {
  var query = `
          DELETE FROM funcionario WHERE id_funcionario = '${idFuncionario}'
      `;

  console.log("Executando a instrucao SQL: \n" + query);
  return database.executar(query);
}

function qtdFuncionarios(idHospital) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
  select count(id_funcionario) as 'qtdfuncionairos' from funcionario where fkHospital = ${idHospital};`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function editarUsuario(nome, senha, email, cargo, idFuncionario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarUsuario():",
    nome,
    senha,
    email,
    cargo,
    idFuncionario
  );
  var instrucao = `
        UPDATE funcionario SET nome_funcionario ='${nome}',
                                          senha ='${senha}',
                                          email ='${email}',
                                          cargo ='${cargo}'
                                          WHERE id_funcionario = 3 ;`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  buscarMedidasCPUKPI,
  buscarMedidasRAMKPI,
  buscarMedidasDisco,
  buscarMedidasRAM,
  buscarMedidasCPU,
  listarTotens,
  buscarUltimaData,
  listarFuncionarios,
  cadastrarUsuario,
  deletarUsuario,
  qtdFuncionarios,
  editarUsuario
};
