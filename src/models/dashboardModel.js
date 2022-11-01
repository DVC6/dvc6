var database = require("../database/config");

function buscarUltimaData(idTotem) {
  instrucaoSql = `select top 1
    DATEPART(DAY, data_uso) as 'dia'
                            from leitura
                            JOIN componente ON fkComponente = idComponente
                            JOIN totem ON fkTotem = idTotem
                            where idTotem = ${idTotem}
                            order by idHistorico desc;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/*-----------LOCAL-----------*/
// function buscarUltimaData(idTotem) {
//   instrucaoSql = `
//     select data_hora_atual, 
//     date_format(data_hora_atual, '%d') as dia 
//     from leitura 
//     JOIN componente ON fkComponente = id_Componente 
//     JOIN totem ON fkTotem = id_Totem where id_Totem = ${idTotem} 
//     order by id_leitura desc limit 1;
// `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
/*---------------------------*/

function buscarMedidasRAMKPI(idTotem) {
  instrucaoSql = `select top 1
                        DATEPART(HOUR,dt_hora) as 'hora' ,
                        DATEPART(MINUTE,dt_hora) as 'minuto',
                        DATEPART(SECOND,dt_hora) as 'segundo',
                        uso
                        from leitura_ram
                        JOIN componente_ram ON fk_componente_ram = id_componente
                        JOIN totem ON fk_totem = id_totem
                        where id_totem = ${idTotem}
                        order by id_leitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/*-----------LOCAL-----------*/
// function buscarMedidasRAMKPI(idTotem) {
//   instrucaoSql = `
//     select data_hora_atual, 
//     date_format(data_hora_atual, '%H') as hora, 
//     date_format(data_hora_atual, '%i') as minutos, 
//     date_format(data_hora_atual, '%s') as segundos, 
//     consumo from leitura 
//     JOIN componente ON fkComponente = id_Componente 
//     JOIN totem ON fkTotem = id_Totem 
//     JOIN tipo_componente on id_tipo_componente = fktipocomponente 
//     where id_Totem = ${idTotem} and TIPO_COMPONENTE.NOME = 'RAM' 
//     order by id_leitura desc limit 1;
//   `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
/*---------------------------*/

function buscarMedidasCPUKPI(idTotem) {
  instrucaoSql = `select top 1
                        DATEPART(HOUR,dt_hora) as 'hora' ,
                        DATEPART(MINUTE,dt_hora) as 'minuto',
                        DATEPART(SECOND,dt_hora) as 'segundo',
                        uso
                        from leitura_cpu
                        JOIN componente_cpu ON fk_componente_cpu = id_componente
                        JOIN totem ON fk_totem = id_totem
                        where id_totem = ${idTotem}
                        order by id_leitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/*-----------LOCAL-----------*/
// function buscarMedidasCPUKPI(idTotem) {
//   instrucaoSql = `
//     select data_hora_atual, 
//     date_format(data_hora_atual, '%H') as hora, 
//     date_format(data_hora_atual, '%i') as minutos,  
//     date_format(data_hora_atual, '%s') as segundos, 
//     consumo from leitura 
//     JOIN componente ON fkComponente = id_Componente 
//     JOIN totem ON fkTotem = id_Totem 
//     JOIN tipo_componente on id_tipo_componente = fktipocomponente 
//     where id_Totem = ${idTotem} and TIPO_COMPONENTE.NOME = 'CPU' 
//     order by id_leitura desc limit 1;
//   `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
/*---------------------------*/

function buscarMedidasDisco(idTotem) {
  instrucaoSql = `select top 1
                        DATEPART(HOUR,dt_hora) as 'hora' ,
                        DATEPART(MINUTE,dt_hora) as 'minuto',
                        DATEPART(SECOND,dt_hora) as 'segundo',
                        uso
                        from leitura_disco
                        JOIN componente_disco ON fk_componente_disco = id_componente
                        JOIN totem ON fk_totem = id_totem
                        where id_totem = ${idTotem}
                        order by id_leitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/*-----------LOCAL-----------*/
// function buscarMedidasDisco(idTotem) {
//   instrucaoSql = `
//     select data_hora_atual, date_format(data_hora_atual, '%H') as hora, 
//     date_format(data_hora_atual, '%i') as minutos,  
//     date_format(data_hora_atual, '%s') as segundos, 
//     consumo from leitura 
//     JOIN componente ON fkComponente = id_Componente 
//     JOIN totem ON fkTotem = id_Totem 
//     JOIN tipo_componente on id_tipo_componente = fktipocomponente 
//     where id_Totem = ${idTotem} and TIPO_COMPONENTE.NOME = 'DISCO' 
//     order by id_leitura desc limit 1;
//   `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
/*---------------------------*/

function buscarMedidasRAM(idTotem) {
  instrucaoSql = `select top 7
                    DATEPART(HOUR,dt_hora) as 'hora' ,
                    DATEPART(MINUTE,dt_hora) as 'minuto',
                    DATEPART(SECOND,dt_hora) as 'segundo',
                    uso
                    from leitura_ram
                    JOIN componente_ram ON fk_componente_ram = id_componente
                    JOIN totem ON fk_totem = id_totem
                    where id_totem = ${idTotem}
                    order by id_leitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/*-----------LOCAL-----------*/
// function buscarMedidasRAM(idTotem) {
//   instrucaoSql = `
//     select data_hora_atual, 
//     date_format(data_hora_atual, '%H') as hora, 
//     date_format(data_hora_atual, '%i') as minutos,  
//     date_format(data_hora_atual, '%s') as segundos, 
//     consumo from leitura 
//     JOIN componente ON fkComponente = id_Componente 
//     JOIN totem ON fkTotem = id_Totem 
//     JOIN tipo_componente on id_tipo_componente = fktipocomponente 
//     where id_Totem = ${idTotem} and TIPO_COMPONENTE.NOME = 'RAM' 
//     order by id_leitura desc limit 7;
//   `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
/*---------------------------*/

function buscarMedidasCPU(idTotem) {
  instrucaoSql = `select top 7
                        DATEPART(HOUR,dt_hora) as 'hora' ,
                        DATEPART(MINUTE,dt_hora) as 'minuto',
                        DATEPART(SECOND,dt_hora) as 'segundo',
                        uso
                        from leitura_cpu
                        JOIN componente_cpu ON fk_componente_cpu = id_componente
                        JOIN totem ON fk_totem = id_totem
                        where id_totem = ${idTotem}
                        order by id_leitura desc`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/*-----------LOCAL-----------*/
// function buscarMedidasCPU(idTotem) {
//   instrucaoSql = `
//     select data_hora_atual, 
//     date_format(data_hora_atual, '%H') as hora, 
//     date_format(data_hora_atual, '%i') as minutos,  
//     date_format(data_hora_atual, '%s') as segundos, 
//     consumo from leitura 
//     JOIN componente ON fkComponente = id_Componente 
//     JOIN totem ON fkTotem = id_Totem 
//     JOIN tipo_componente on id_tipo_componente = fktipocomponente 
//     where id_Totem = ${idTotem} and TIPO_COMPONENTE.NOME = 'CPU' 
//     order by id_leitura desc limit 7;
//   `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
/*---------------------------*/

function listarTotens(idHospital) {
  console.log("Listando todos os totens cadastrados em seu Hospital");
  var instrucao = `
        SELECT
            id_totem,
            nome
        FROM totem
        WHERE fk_hospital = '${idHospital}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

/*-----------LOCAL-----------*/
// function listarTotens(idHospital) {
//   console.log("Listando todos os totens cadastrados em seu Hospital");
//   var instrucao = `
//     select id_Totem, nome_maquina from totem WHERE fkHospital = '${idHospital}';
//       `;
//   console.log("Executando a instrução SQL: \n" + instrucao);
//   return database.executar(instrucao);
// }
/*---------------------------*/

module.exports = {
  buscarMedidasCPUKPI,
  buscarMedidasRAMKPI,
  buscarMedidasDisco,
  buscarMedidasRAM,
  buscarMedidasCPU,
  listarTotens,
  buscarUltimaData,
};
