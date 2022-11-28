var totemModel = require('../models/totemModel.js');

function listar(req, res) {

  console.log("Listando totems");

  totemModel.listar().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao listar os totems.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrarTotem(req, res) {
  
    var localizacao = req.body.localizacao;
    var nomeDaMaquina = req.body.nomeDaMaquina;
    var status = req.body.status;
    var fkHospital = req.body.fkHospital;
  
    console.log("Cadastrando totem");
  
    totemModel.cadastrarTotem(localizacao, nomeDaMaquina, status, fkHospital).then(function (resultado) {
      res.status(201).json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao cadastrar o totem.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

function deletar(req, res) {
  
    var idTotem = req.params.idTotem;
  
    console.log("Deletando totem");
  
    totemModel.deletar(idTotem).then(function (resultado) {
      res.status(200).json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar o totem.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

function atualizarStatusTotem(req, res) {
  
    var idTotem = req.params.idTotem;
    var status = req.body.status;
  
    console.log("Atualizando status do totem");
  
    totemModel.atualizarStatusTotem(idTotem, status).then(function (resultado) {
      res.status(200).json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao atualizar o status do totem.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

module.exports = {
  listar,
  cadastrarTotem,
  deletar,
  atualizarStatusTotem
};