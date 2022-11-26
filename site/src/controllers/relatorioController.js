var relatorioModel = require("../models/relatorioModel");

function periodoSimples(req, res) {
  var idTotem = req.params.idTotem;
  var data = req.body.data;
  var ordenar = data.split('-');
  var dia = `${ordenar[2]}`;
  var mes = `${ordenar[1]}`;
  var ano = `${ordenar[0]}`;

  if (dia == undefined) {
    console.log("dia idenfinido " + dia);
    res.status(400).send("Seu nome está undefined!");
  } else if (mes == undefined) {
    console.log(idTotem);
    console.log(dia);
    console.log("mes idenfinido " + mes);
    res.status(400).send("Seu usuario está undefined!");
  } else if (ano == undefined) {
    console.log("ano idenfinido " + ano);
    res.status(400).send("Sua senha está undefined!");
  } else {
    relatorioModel
      .periodoSimples(dia, mes, ano, idTotem)
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

module.exports = {
  periodoSimples,
};
