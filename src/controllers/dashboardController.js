var dashboardModel = require("../models/dashboardModel");

function buscarTotensEmRisco(req, res) {
  var idTotem = req.params.idTotem;

  console.log(`Recuperando medidas em tempo real`);

  dashboardModel
    .buscarMedidasRAMKPI(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        var percentualRAM = resultado[0].percentualConsumo ?? 0;
      }
      dashboardModel
        .buscarMedidasCPUKPI(idTotem)
        .then(function (resultadoCPU) {
          if (resultadoCPU.length > 0) {
            var percentualCPU = resultadoCPU[0].percentualConsumo ?? 0;
            var novoResultado = {
              percentualRAM: percentualRAM,
              percentualCPU: percentualCPU,
            };
            if (resultado.length > 0) {
              res.status(200).json(novoResultado);
            } else {
              res.status(204).send("Nenhum resultado encontrado!");
            }
          } else {
            res.status(204).send("Nenhum resultado encontrado!");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "Houve um erro ao buscar as ultimas medidas.",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimaData(req, res) {
  var idTotem = req.params.idTotem;

  console.log(`Buscando última data`);

  dashboardModel
    .buscarUltimaData(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a ultima data.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasCPUKPI(req, res) {
  var idTotem = req.params.idTotem;

  console.log(`Recuperando medidas em tempo real`);

  dashboardModel
    .buscarMedidasCPUKPI(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasRAMKPI(req, res) {
  var idTotem = req.params.idTotem;

  console.log(`Recuperando medidas em tempo real`);

  dashboardModel
    .buscarMedidasRAMKPI(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasDisco(req, res) {
  var idTotem = req.params.idTotem;

  console.log(`Recuperando medidas em tempo real`);

  dashboardModel
    .buscarMedidasDisco(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasRAM(req, res) {
  var idTotem = req.params.idTotem;

  console.log(`Recuperando medidas em tempo real`);

  dashboardModel
    .buscarMedidasRAM(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasCPU(req, res) {
  var idTotem = req.params.idTotem;

  console.log(`Recuperando medidas em tempo real`);

  dashboardModel
    .buscarMedidasCPU(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarTotens(req, res) {
  var idHospital = req.params.idHospital;

  dashboardModel
    .listarTotens(idHospital)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os totens: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarFuncionarios(req, res) {
  var idHospital = req.params.idHospital;

  dashboardModel
    .listarFuncionarios(idHospital)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar funcionários: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarUsuario(req, res) {
  var idHospital = req.params.idHospital;

  var nome = req.body.nome;
  var senha = req.body.senha;
  var email = req.body.email;
  var cargo = req.body.cargo;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu usuario está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else {
    dashboardModel
      .cadastrarUsuario(nome, senha, email, cargo, idHospital)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function qtdFuncionarios(req, res) {
  var idHospital = req.params.idHospital;
  dashboardModel
    .qtdFuncionarios(idHospital)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de funcionários: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function qtdTotem(req, res) {
  var idHospital = req.params.idHospital;
  dashboardModel
    .qtdTotem(idHospital)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de totens: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletarUsuario(req, res) {
  console.log("Tentando deletar usuario...");
  var idFuncionario = req.params.idFuncionario;

  if (idFuncionario == undefined) {
    res.status(404).send("ID nao encontrado!");
  } else {
    dashboardModel
      .deletarUsuario(idFuncionario)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          "\n Houve um erro ao tentar deletar o usuario! Erro: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function editarUsuario(req, res) {
  console.log("Tentando editar usuario...");

  var idFuncionario = req.params.idFuncionario;
  var nome = req.body.nome;
  var senha = req.body.senha;
  var email = req.body.email;
  var cargo = req.body.cargo;
  if (idFuncionario == undefined) {
    res.status(404).send("ID nao encontrado!");
  } else {
    dashboardModel
      .editarUsuario(nome, senha, email, cargo, idFuncionario)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          "\n Houve um erro ao tentar editar o usuario! Erro: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function pegarDados(req, res) {
  var idTotem = req.params.idTotem;

  dashboardModel
    .pegarDados(idTotem)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os dados: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletarfkComponente(req, res) {
  console.log("Tentando deletar componente...");
  var fkComponente = req.params.fkComponente;

  if (fkComponente == undefined) {
    res.status(404).send("ID nao encontrado!");
  } else {
    dashboardModel
      .deletarfkComponente(fkComponente)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          "\n Houve um erro ao tentar deletar o componente! Erro: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function deletarTotem(req, res) {
  console.log("Tentando deletar totem...");
  var idTotem = req.params.idTotem;

  if (idTotem == undefined) {
    res.status(404).send("ID nao encontrado!");
  } else {
    dashboardModel
      .deletarTotem(idTotem)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          "\n Houve um erro ao tentar deletar o totem! Erro: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function totensAcima90(req, res) {
  var idHospital = req.params.idHospital;

  dashboardModel
    .totensAcima90(idHospital)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os dados: ", erro.sqlMessage);
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
  buscarTotensEmRisco,
  listarFuncionarios,
  cadastrarUsuario,
  editarUsuario,
  deletarUsuario,
  qtdFuncionarios,
  qtdTotem,
  pegarDados,
  deletarTotem,
  deletarfkComponente,
  totensAcima90,
};
