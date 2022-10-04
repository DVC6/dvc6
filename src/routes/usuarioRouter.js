var express = require('express');
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get('/usuario/listar-por-hospital', function (res,res) {
    usuarioController.listar(req, res);
});

router.post('/usuario/cadastrar', function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post('/usuario/autenticar', function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post('/usuario/alterar-senha', function (req, res) {
    usuarioController.alterarSenha(req, res);
});

router.post('/usuario/deletar', function (req, res) {
    usuarioController.deletar(req, res);
});

module.exports = router;