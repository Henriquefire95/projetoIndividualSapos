var quizModel = require("../models/quizModel");

// Alternativas válidas do quiz (as mesmas do quiz.html). A API só aceita estes valores.
var JOGOS = ["Sonic Frontiers", "Sonic Mania", "Sonic Adventure 2", "Sonic Generations", "Sonic Colors", "Sonic Forces"];
var PERSONAGENS = ["Sonic", "Shadow", "Tails", "Knuckles", "Amy"];

// POST /quiz/responder
function responder(req, res) {
    var idUsuario = Number(req.body.idUsuarioServer);
    var jogoMais = req.body.jogoMaisServer;
    var jogoMenos = req.body.jogoMenosServer;
    var personagem = req.body.personagemServer;

    if (!Number.isInteger(idUsuario) || idUsuario < 1) {
        res.status(400).send("Faça login para responder o quiz.");
    } else if (JOGOS.indexOf(jogoMais) == -1 || JOGOS.indexOf(jogoMenos) == -1 || PERSONAGENS.indexOf(personagem) == -1) {
        res.status(400).send("Resposta inválida. Responda as 3 perguntas.");
    } else {

        quizModel.salvar(idUsuario, jogoMais, jogoMenos, personagem)
            .then(
                function (resultado) {
                    res.status(201).json({ jogoMais: jogoMais, jogoMenos: jogoMenos, personagem: personagem });
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao salvar o quiz! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// GET /quiz/minha/:idUsuario → respostas já enviadas (204 se ainda não respondeu)
function minha(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario < 1) {
        res.status(400).send("Usuário inválido.");
    } else {
        quizModel.buscarDoUsuario(idUsuario)
            .then(
                function (resultado) {
                    if (resultado.length > 0) {
                        res.status(200).json(resultado[0]);
                    } else {
                        res.status(204).send();
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// junta o resultado do banco com a lista de alternativas, para as sem voto aparecerem com 0
function completar(lista, linhas) {
    return lista.map(function (nome) {
        var linha = linhas.find(function (l) { return l.opcao == nome; });
        return { opcao: nome, total: linha ? Number(linha.total) : 0 };
    });
}

// GET /quiz/resultados → contagens que alimentam o dashboard
function resultados(req, res) {
    var dados = {};

    quizModel.contarPor("jogo_mais")
        .then(function (jogoMais) {
            dados.jogoMais = completar(JOGOS, jogoMais);
            return quizModel.contarPor("jogo_menos");
        })
        .then(function (jogoMenos) {
            dados.jogoMenos = completar(JOGOS, jogoMenos);
            return quizModel.contarPor("personagem");
        })
        .then(function (personagem) {
            dados.personagem = completar(PERSONAGENS, personagem);
            dados.total = dados.jogoMais.reduce(function (soma, j) { return soma + j.total; }, 0);
            res.json(dados);
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao montar os resultados! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    responder,
    minha,
    resultados
}