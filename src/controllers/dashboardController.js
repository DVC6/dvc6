var dashboardModel = require("../models/dashboardModel");

function buscarTotensEmRisco(req, res) {

    var idTotem = req.params.idTotem;

    console.log(`Recuperando medidas em tempo real`);

    dashboardModel.buscarMedidasRAMKPI(idTotem).then(function (resultado) {
        if (resultado.length > 0) {
            var percentualRAM = resultado[0].percentualConsumo ?? 0;
        }
        dashboardModel.buscarMedidasCPUKPI(idTotem).then(function (resultadoCPU) {
            if (resultadoCPU.length > 0) {
                var percentualCPU = resultadoCPU[0].percentualConsumo ?? 0;
                var novoResultado = { percentualRAM: percentualRAM, percentualCPU: percentualCPU };
                if (resultado.length > 0) {
                    res.status(200).json(novoResultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimaData(req, res) {
    var idTotem = req.params.idTotem;

    console.log(`Buscando última data`);

    dashboardModel.buscarUltimaData(idTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a ultima data.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasCPUKPI(req, res) {

    var idTotem = req.params.idTotem;

    console.log(`Recuperando medidas em tempo real`);

    dashboardModel.buscarMedidasCPUKPI(idTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasRAMKPI(req, res) {

    var idTotem = req.params.idTotem;

    console.log(`Recuperando medidas em tempo real`);

    dashboardModel.buscarMedidasRAMKPI(idTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasDisco(req, res) {

    var idTotem = req.params.idTotem;

    console.log(`Recuperando medidas em tempo real`);

    dashboardModel.buscarMedidasDisco(idTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasRAM(req, res) {

    var idTotem = req.params.idTotem;

    console.log(`Recuperando medidas em tempo real`);

    dashboardModel.buscarMedidasRAM(idTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasCPU(req, res) {

    var idTotem = req.params.idTotem;

    console.log(`Recuperando medidas em tempo real`);

    dashboardModel.buscarMedidasCPU(idTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarTotens(req, res) {

    var idHospital = req.params.idHospital;

    dashboardModel.listarTotens(idHospital).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarMedidasCPUKPI,
    buscarMedidasRAMKPI,
    buscarMedidasDisco,
    buscarMedidasRAM,
    buscarMedidasCPU,
    listarTotens,
    buscarUltimaData,
    buscarTotensEmRisco

}