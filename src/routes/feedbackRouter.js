var express = require('express');
var router = express.Router();

var feedbackController = require('../controllers/feedbackController');

router.post('/enviar', function (req, res) {
    feedbackController.enviar(req, res);
  });
  
  module.exports = router;