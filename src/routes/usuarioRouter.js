var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listar-por-hospital", function (req, res) {
  usuarioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.entrar(req, res);
});

router.post("/alterar-senha", function (req, res) {
  usuarioController.alterarSenha(req, res);
});

router.post("/deletar", function (req, res) {
  usuarioController.deletar(req, res);
});

router.post("/editarUsuario", function (req, res) {
  dashboardController.editarUsuario(req, res);
});

module.exports = router;
