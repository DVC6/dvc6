var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.post("/periodoSimples/:idTotem", function (req, res) {
  relatorioController.periodoSimples(req, res);
});

module.exports = router;
