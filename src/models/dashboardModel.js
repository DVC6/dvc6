var database = require("../database/config");

/* ----------- AZURE ---------- */
function buscarUltimaData(idTotem) {
  instrucaoSql = `select top 1
    DATEPART(DAY, data_hora_atual) as 'dia'
                            from leitura
                            JOIN componente ON fkcomponente = id_componente
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
                        JOIN tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente
                        where id_totem = ${idTotem}
                        AND tipo_componente.tipo = 'RAM'
                        order by id_leitura desc`;
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
                        JOIN tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente
                        where id_totem = ${idTotem}
                        AND tipo_componente.tipo = 'CPU'
                        order by id_leitura desc`;
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
                        JOIN tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente
                        where id_totem = ${idTotem}
                        AND tipo = 'DISCO'
                        order by id_leitura desc`;
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
                      JOIN tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente
                      where id_totem = ${idTotem}
                      AND tipo = 'RAM'
                      order by id_leitura desc`;
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
                        JOIN tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente
                        where id_totem = ${idTotem}
                        AND tipo = 'CPU'
                        order by id_leitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarTotens(idHospital) {
  console.log("Listando todos os totens cadastrados em seu Hospital");
  var instrucao = `
  select distinct(totem.id_totem), 
  nome_maquina, 
  last_value(leitura.consumo) over (order by totem.id_totem) as consumo, 
  localizacao from totem 
  join componente on totem.id_totem = componente.fktotem 
  join leitura on componente.id_componente = leitura.fkcomponente 
  join tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente 
  where fkHospital = '${idHospital}' and tipo_componente.tipo = 'CPU';
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

function listarComponentes(idTotem) {
  console.log("Listando todos os componentes cadastrados de um totem");
  var instrucao = `
    select 
    id_componente,
  id_totem, 
  tipo_componente.tipo, 
  componente.modelo, 
  tipo_componente.medida 
  from totem 
  join componente on totem.id_totem = componente.fktotem 
  join tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente 
  where totem.id_totem = '${idTotem}';
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
              delete from funcionario WHERE id_funcionario = '${idFuncionario}';
              `;

  console.log("Executando a instrucao SQL: \n" + query);
  return database.executar(query);
}

function qtdFuncionarios(idHospital) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdFuncionarios()"
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
    WHERE id_funcionario = ${idFuncionario};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function editarTotem(nome, localizacao, idTotem) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarTotem():",
    nome,
    localizacao,
    idTotem
  );
  var instrucao = `
      UPDATE totem SET nome_maquina ='${nome}',
      localizacao ='${localizacao}'
      WHERE id_totem = ${idTotem};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function qtdTotem(idHospital) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdTotem()"
  );
  var instrucao = `
        select count(id_totem) as 'qtdtotem' from totem where fkHospital = ${idHospital};`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function pegarDados(idTotem) {
  instrucaoSql = `
      select 
      distinct(fkcomponente), 
      fktotem, 
      id_totem, 
      from totem 
      join componente on totem.id_totem = componente.fktotem 
      join leitura on componente.id_componente = leitura.fkcomponente 
      where id_totem = ${idTotem};
      `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletarfkComponente(fkComponente) {
  var query = `
          delete from leitura WHERE fkcomponente = '${fkComponente}';
      `;
  console.log("Executando a instrucao SQL: \n" + query);
  return database.executar(query);
}

function deletarTotem(idTotem) {
  var query = `
      delete from componente WHERE fktotem = '${idTotem}';
  `;
  var query2 = `
      delete from totem WHERE id_totem = '${idTotem}';
  `;
  console.log(`Executando a instrucao SQL: \n${query}${query2}`);
  return database.executar(query), database.executar(query2);
}

function totensCPUAcima90(idHospital) {
  instrucaoSql = `
  select distinct(totem.id_totem), nome_maquina, last_value(leitura.consumo) over (order by totem.id_totem) as consumo, localizacao from totem 
  join componente on totem.id_totem = componente.fktotem join leitura on componente.id_componente = leitura.fkcomponente
  join tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente
  where fkHospital = '${idHospital}' and tipo_componente.tipo = 'CPU';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function totensRAMAcima90(idHospital) {
  instrucaoSql = `
  select distinct(totem.id_totem), nome_maquina, last_value(leitura.consumo) over (order by totem.id_totem) as consumo, localizacao from totem 
  join componente on totem.id_totem = componente.fktotem join leitura on componente.id_componente = leitura.fkcomponente
  join tipo_componente on componente.fktipocomponente = tipo_componente.id_tipo_componente
  where fkHospital = '${idHospital}' and tipo_componente.tipo = 'RAM';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/* --------------------- */

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
  qtdTotem,
  editarUsuario,
  editarTotem,
  pegarDados,
  deletarTotem,
  deletarfkComponente,
  totensCPUAcima90,
  totensRAMAcima90,
  listarComponentes,
};
