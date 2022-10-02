var express = require('express');
var router = express.Router();

// const checkAuth = require('../config/auth').checkAuth;

var usuarioController = require('../controllers/hospitalController');

router.get('/', function (req, res) {
  usuarioController.testar(req, res);
});

router.get('/listar', function (req, res) {
  usuarioController.listar(req, res);
});

router.post('/cadastrar', function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post('/autenticar', function (req, res) {
  usuarioController.entrar(req, res);
});

router.put('/alterarSenha', function (req, res) {
  usuarioController.alterarSenha(req, res);
});

router.delete('/deletar', (req, res) => {
  usuarioController.deletar(req, res);
});

module.exports = router;
