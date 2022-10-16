function enviar(req, res) {
  const { starvalue, texto } = req.body;

  feedbackModel
    .enviar(starvalue, texto)
    .then(function (resultado) {
      res.json(resultado);

      console.log("Menssagem postada");
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar envio! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}
