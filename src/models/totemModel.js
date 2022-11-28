const database = require('../database/config');

function listar() {

    const query = `
        SELECT * FROM totem;
    `

    console.log('Executando a query: ' + query);
    return database.executar(query);
}

function cadastrarTotem(
    localizacao,
    nomeDaMaquina,
    status,
    fkHospital
) {

    const query = `
        INSERT INTO totem(lozalicazao, nomeDaMaquina, status, fkHospital) VALUES ('${localizacao}', '${nomeDaMaquina}', '${status}', '${fkHospital}');
    `

    database.executar(query);

    console.log('Executando a query: ' + query);
}

function atualizarStatusTotem (
    status,
    idTotem
) {
    const query = `
        UPDATE totem SET status = '${status}' WHERE idTotem = '${idTotem}';
    `

    database.executar(query);
    console.log('Executando a query: ' + query);
}

function deletaTotem(
    idTotem
) {

    const query = `
        DELETE FROM totem WHERE idTotem = '${idTotem}';
    `

    database.executar(query);
    console.log('Executando a query: ' + query);
}