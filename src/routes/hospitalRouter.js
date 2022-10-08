var express = require('express');
var router = express.Router();

var hospitalController = require('../controllers/hospitalController');

router.get('/hospital/listar', function (req, res) {
  hospitalController.listar(req, res);
});

router.post('/hospital/cadastrar', function (req, res) {
  hospitalController.cadastrar(req, res);
});

router.post('/hospital/autenticar', function (req, res) {
  hospitalController.entrar(req, res);
});

router.put('/hospital/alterar-senha', function (req, res) {
  hospitalController.alterarSenha(req, res);
});

router.delete('/hospital/deletar', function (req, res) {
  hospitalController.deletar(req, res);
});

module.exports = router;
