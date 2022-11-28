var express = require('express');
var router = express.Router();

var preCheckinController = require('../controllers/preCheckinController');

router.post('/realizar-pre-checkin', (req, res) => {
  preCheckinController.relizarPreCheckin(req, res);
});

router.get('/finalizacao', (req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=pre-checkin.pdf`,
  });
  preCheckinController.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});

module.exports = router;
