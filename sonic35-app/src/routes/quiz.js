var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// Recebendo os dados do html e direcionando para as funções de quizController.js
router.post("/responder", function (req, res) {
    quizController.responder(req, res);
});

router.get("/minha/:idUsuario", function (req, res) {
    quizController.minha(req, res);
});

router.get("/resultados", function (req, res) {
    quizController.resultados(req, res);
});

module.exports = router;