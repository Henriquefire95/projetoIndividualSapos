var quizModel = require("../models/quizModel");

function cadastrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (acertos == undefined) {
        res.status(400).send("Seus acertos estão undefined!");
    } else if (erros == undefined) {
        res.status(400).send("Seus erros estão undefined!");
    } else {
        quizModel.cadastrar(idUsuario, acertos, erros)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao gravar o resultado do quiz! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
};
