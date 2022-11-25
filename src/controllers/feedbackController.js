var feedbackModel = require('../models/feedbackModel')

function enviar(req, res) {
  const { starvalue, texto, idFuncionario } = req.body;
  console.log(req.body)

  feedbackModel
    .enviar(starvalue, texto, idFuncionario)
    .then(function (resultado) {
      res.json(resultado);

      console.log('Menssagem postada');
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('\nHouve um erro ao realizar envio! Erro: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  enviar,
};
