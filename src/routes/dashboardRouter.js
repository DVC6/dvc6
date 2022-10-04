var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarUltimaData/:idTotem", function(req, res) {
    dashboardController.buscarUltimaData(req, res);
});

router.get("/buscarMedidasCPUKPI/:idTotem", function(req, res) {
    dashboardController.buscarMedidasCPUKPI(req, res);
});

router.get("/buscarMedidasRAMKPI/:idTotem", function(req, res) {
    dashboardController.buscarMedidasRAMKPI(req, res);
});

router.get("/buscarMedidasDisco/:idTotem", function(req, res) {
    dashboardController.buscarMedidasDisco(req, res);
});

router.get("/buscarMedidasRAM/:idTotem", function(req, res) {
    dashboardController.buscarMedidasRAM(req, res);
});

router.get("/buscarMedidasCPU/:idTotem", function(req, res) {
    dashboardController.buscarMedidasCPU(req, res);
});

router.get("/buscarTotensEmRisco/:idTotem", function(req, res) {
    dashboardController.buscarTotensEmRisco(req, res);
});

router.get("/listarTotens/:idHospital", function (req, res) {
    dashboardController.listarTotens(req, res);
});
  
module.exports = router;