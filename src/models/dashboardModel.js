var database = require("../database/config");

function buscarUltimaData(idTotem) {
    instrucaoSql = `select top 1
    DATEPART(DAY, data_uso) as 'dia'
                            from leitura
                            JOIN componente ON fkComponente = idComponente
                            JOIN totem ON fkTotem = idTotem
                            where idTotem = ${idTotem}
                            order by idHistorico desc;`;
    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasRAMKPI(idTotem) {
    instrucaoSql = `select top 1
                        DATEPART(HOUR,data_uso) as 'hora' ,
                        DATEPART(MINUTE,data_uso) as 'minuto',
                        DATEPART(SECOND,data_uso) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = idComponente
                        JOIN totem ON fkTotem = idTotem
                        where idTotem = ${idTotem}
                        AND tipoComponente = 'RAM'
                        order by idLeitura desc`;
    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasCPUKPI(idTotem) {
    instrucaoSql = `select top 1
                        DATEPART(HOUR,data_uso) as 'hora' ,
                        DATEPART(MINUTE,data_uso) as 'minuto',
                        DATEPART(SECOND,data_uso) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = idComponente
                        JOIN totem ON fkTotem = idTotem
                        where idTotem = ${idTotem}
                        AND tipoComponente = 'CPU'
                        order by idLeitura desc`;
    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasDisco(idTotem) {
    instrucaoSql = `select top 1
                        DATEPART(HOUR,data_uso) as 'hora' ,
                        DATEPART(MINUTE,data_uso) as 'minuto',
                        DATEPART(SECOND,data_uso) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = idComponente
                        JOIN totem ON fkTotem = idTotem
                        where idTotem = ${idTotem}
                        AND tipo = 'DISCO'
                        order by idLeitura desc`;
    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasRAM(idTotem) {
instrucaoSql = `select top 7
                    DATEPART(HOUR,data_uso) as 'hora' ,
                    DATEPART(MINUTE,data_uso) as 'minuto',
                    DATEPART(SECOND,data_uso) as 'segundo',
                    consumo
                    from leitura
                    JOIN componente ON fkComponente = idComponente
                    JOIN totem ON fkTotem = idTotem
                    where idTotem = ${idTotem}
                    AND tipo = 'RAM'
                    order by idLeitura desc`;
    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasCPU(idTotem) {
    instrucaoSql = `select top 7
                        DATEPART(HOUR,data_uso) as 'hora' ,
                        DATEPART(MINUTE,data_uso) as 'minuto',
                        DATEPART(SECOND,data_uso) as 'segundo',
                        consumo
                        from leitura
                        JOIN componente ON fkComponente = idComponente
                        JOIN totem ON fkTotem = idTotem
                        where idTotem = ${idTotem}
                        AND tipo = 'CPU'
                        order by idLeitura desc`;
    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTotens(idHospital) {
    console.log("Listando todos os totens cadastrados em seu Hospital");
    var instrucao = `
        SELECT 
            idTotem,
            nome_maquina
        FROM totem
        WHERE fkHospital = '${idHospital}';
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarMedidasCPUKPI,
    buscarMedidasRAMKPI,
    buscarMedidasDisco,
    buscarMedidasRAM,
    buscarMedidasCPU,
    listarTotens,
    buscarUltimaData
}