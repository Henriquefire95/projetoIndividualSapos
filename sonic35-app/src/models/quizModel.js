var database = require("../database/config");

// Um usuário tem no máximo uma resposta: se já existe, atualiza.
function salvar(idUsuario, jogoMais, jogoMenos, personagem) {
    var instrucaoSql = `
        INSERT INTO resposta_quiz (fk_usuario, jogo_mais, jogo_menos, personagem)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE jogo_mais = VALUES(jogo_mais), jogo_menos = VALUES(jogo_menos), personagem = VALUES(personagem);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idUsuario, jogoMais, jogoMenos, personagem]);
}

function buscarDoUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT jogo_mais AS jogoMais, jogo_menos AS jogoMenos, personagem FROM resposta_quiz WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idUsuario]);
}

// a coluna vem de uma lista fixa daqui (nunca do navegador), por isso pode entrar na instrução
function contarPor(coluna) {
    var colunasPermitidas = ["jogo_mais", "jogo_menos", "personagem"];
    if (colunasPermitidas.indexOf(coluna) == -1) {
        return Promise.reject("Coluna inválida");
    }
    var instrucaoSql = `
        SELECT ${coluna} AS opcao, COUNT(*) AS total FROM resposta_quiz GROUP BY ${coluna};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, []);
}

module.exports = {
    salvar,
    buscarDoUsuario,
    contarPor
};