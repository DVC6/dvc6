var express = require('express');
var router = express.Router();

var totemController = require('../controllers/totemController');

router.get('/listar', function (req, res) {
  totemController.listar(req, res);
})

router.post('/cadastrar', function (req, res) {
  totemController.cadastrarTotem(req, res);
})

router.delete('/deletar/:idTotem', function (req, res) {
  totemController.deletar(req, res);
})

router.put('/atualizarStatusTotem/:idTotem', function (req, res) {
  totemController.atualizarStatusTotem(req, res);
})

module.exports = router;