var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarUltimaData/:idTotem", function (req, res) {
  dashboardController.buscarUltimaData(req, res);
});

router.get("/buscarMedidasCPUKPI/:idTotem", function (req, res) {
  dashboardController.buscarMedidasCPUKPI(req, res);
});

router.get("/buscarMedidasRAMKPI/:idTotem", function (req, res) {
  dashboardController.buscarMedidasRAMKPI(req, res);
});

router.get("/buscarMedidasDisco/:idTotem", function (req, res) {
  dashboardController.buscarMedidasDisco(req, res);
});

router.get("/buscarMedidasRAM/:idTotem", function (req, res) {
  dashboardController.buscarMedidasRAM(req, res);
});

router.get("/buscarMedidasCPU/:idTotem", function (req, res) {
  dashboardController.buscarMedidasCPU(req, res);
});

router.get("/buscarTotensEmRisco/:idTotem", function (req, res) {
  dashboardController.buscarTotensEmRisco(req, res);
});

router.get("/listarTotens/:idHospital", function (req, res) {
  dashboardController.listarTotens(req, res);
});

router.get("/listarFuncionarios/:idHospital", function (req, res) {
  dashboardController.listarFuncionarios(req, res);
});

router.get("/listarComponentes/:idTotem", function (req, res) {
  dashboardController.listarComponentes(req, res);
});

router.get("/qtdFuncionarios/:idHospital", function (req, res) {
  dashboardController.qtdFuncionarios(req, res);
});

router.get("/qtdTotem/:idHospital", function (req, res) {
  dashboardController.qtdTotem(req, res);
});

router.get("/pegarDados/:idTotem", function (req, res) {
  dashboardController.pegarDados(req, res);
});

router.get("/totensCPUAcima90/:idHospital", function (req, res) {
  dashboardController.totensCPUAcima90(req, res);
});

router.get("/totensRAMAcima90/:idHospital", function (req, res) {
  dashboardController.totensRAMAcima90(req, res);
});

router.post("/cadastrarUsuario/:idHospital", function (req, res) {
  dashboardController.cadastrarUsuario(req, res);
});

router.post("/deletarUsuario/:idFuncionario", function (req, res) {
  dashboardController.deletarUsuario(req, res);
});

router.post("/deletarTotem/:idTotem", function (req, res) {
  dashboardController.deletarTotem(req, res);
});

router.post("/deletarfkComponente/:fkComponente", function (req, res) {
  dashboardController.deletarfkComponente(req, res);
});

router.post("/editarUsuario/:idFuncionario", function (req, res) {
  dashboardController.editarUsuario(req, res);
});

router.post("/editarTotem/:idTotem", function (req, res) {
  dashboardController.editarTotem(req, res);
});

module.exports = router;
