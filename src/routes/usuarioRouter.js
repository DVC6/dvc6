var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listar-por-hospital", function (req, res) {
  usuarioController.listar(req, res);
});

router.get("/pegarDadosUsuarioGerente/:idUsuario", function (req, res) {
  usuarioController.pegarDadosUsuarioGerente(req, res);
});

router.get("/pegarDadosUsuario/:idUsuario", function (req, res) {
  usuarioController.pegarDadosUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.entrar(req, res);
});

router.post("/editarUsuarioGerente/:idFuncionario", function (req, res) {
  usuarioController.editarUsuarioGerente(req, res);
});

router.post("/editarUsuario/:idFuncionario", function (req, res) {
  usuarioController.editarUsuario(req, res);
});

router.post("/alterarSenhaGerente/:idFuncionario", function (req, res) {
  usuarioController.alterarSenhaGerente(req, res);
});

router.post("/alterarSenha/:idFuncionario", function (req, res) {
  usuarioController.alterarSenha(req, res);
});

// router.post("/alterar-senha", function (req, res) {
//   usuarioController.alterarSenha(req, res);
// });

router.post("/deletar", function (req, res) {
  usuarioController.deletar(req, res);
});

module.exports = router;
