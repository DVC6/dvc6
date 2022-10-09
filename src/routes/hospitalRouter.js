var express = require('express');
var router = express.Router();

var hospitalController = require('../controllers/hospitalController');

router.get('/listar', function (req, res) {
  hospitalController.listar(req, res);
});

router.post('/cadastrar', function (req, res) {
  hospitalController.cadastrar(req, res);
});

router.post('/autenticar', function (req, res) {
  hospitalController.entrar(req, res);
});

router.put('/alterar-senha', function (req, res) {
  hospitalController.alterarSenha(req, res);
});

router.delete('/deletar', function (req, res) {
  hospitalController.deletar(req, res);
});

module.exports = router;
