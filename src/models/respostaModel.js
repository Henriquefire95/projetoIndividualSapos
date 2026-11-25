var database = require("../database/config");

function cadastrar(idUsuario, idPersonagem, jogoFavorito, zonaFavorita, plataforma, tempoFa) {
    console.log("ACESSEI O RESPOSTA MODEL \n function cadastrar():", idUsuario, idPersonagem, jogoFavorito, zonaFavorita, plataforma, tempoFa);
    var instrucaoSql = `
        INSERT INTO resposta (fk_usuario, fk_personagem, jogo_favorito, zona_favorita, plataforma, tempo_fa)
        VALUES (${idUsuario}, ${idPersonagem}, '${jogoFavorito}', '${zonaFavorita}', '${plataforma}', '${tempoFa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
