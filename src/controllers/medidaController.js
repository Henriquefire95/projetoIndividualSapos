var medidaModel = require("../models/medidaModel");

function buscarKpis(req, res) {
    var idUsuario = req.params.idUsuario;
    var dadosKpi = {};

    medidaModel.contarRespostas()
        .then(function (resultadoRespostas) {
            dadosKpi.totalRespostas = resultadoRespostas[0].totalRespostas;
            return medidaModel.contarUsuarios();
        })
        .then(function (resultadoUsuarios) {
            dadosKpi.totalUsuarios = resultadoUsuarios[0].totalUsuarios;
            return medidaModel.contarRespostasUsuario(idUsuario);
        })
        .then(function (resultadoSuasRespostas) {
            dadosKpi.suasRespostas = resultadoSuasRespostas[0].suasRespostas;
            return medidaModel.buscarMelhorQuizUsuario(idUsuario);
        })
        .then(function (resultadoMelhorQuiz) {
            dadosKpi.melhorQuiz = resultadoMelhorQuiz[0].melhorQuiz;
            res.status(200).json(dadosKpi);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as KPIs.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPersonagens(req, res) {
    medidaModel.buscarPersonagens().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os personagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPlataformas(req, res) {
    medidaModel.buscarPlataformas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as plataformas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarZonas(req, res) {
    medidaModel.buscarZonas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as zonas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarQuizUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    medidaModel.buscarQuizUsuario(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as tentativas do quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarKpis,
    buscarPersonagens,
    buscarPlataformas,
    buscarZonas,
    buscarQuizUsuario
};
