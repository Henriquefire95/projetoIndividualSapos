var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/kpis/:idUsuario", function (req, res) {
    medidaController.buscarKpis(req, res);
});

router.get("/personagens", function (req, res) {
    medidaController.buscarPersonagens(req, res);
});

router.get("/plataformas", function (req, res) {
    medidaController.buscarPlataformas(req, res);
});

router.get("/zonas", function (req, res) {
    medidaController.buscarZonas(req, res);
});

router.get("/quiz/:idUsuario", function (req, res) {
    medidaController.buscarQuizUsuario(req, res);
});

module.exports = router;
