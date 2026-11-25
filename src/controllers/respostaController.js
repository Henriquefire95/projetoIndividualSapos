var respostaModel = require("../models/respostaModel");

function cadastrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idPersonagem = req.body.idPersonagemServer;
    var jogoFavorito = req.body.jogoFavoritoServer;
    var zonaFavorita = req.body.zonaFavoritaServer;
    var plataforma = req.body.plataformaServer;
    var tempoFa = req.body.tempoFaServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (idPersonagem == undefined) {
        res.status(400).send("Seu personagem está undefined!");
    } else if (jogoFavorito == undefined) {
        res.status(400).send("Seu jogo favorito está undefined!");
    } else if (zonaFavorita == undefined) {
        res.status(400).send("Sua zona favorita está undefined!");
    } else if (plataforma == undefined) {
        res.status(400).send("Sua plataforma está undefined!");
    } else if (tempoFa == undefined) {
        res.status(400).send("Seu tempo de fã está undefined!");
    } else {
        respostaModel.cadastrar(idUsuario, idPersonagem, jogoFavorito, zonaFavorita, plataforma, tempoFa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao gravar a pesquisa! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
};
