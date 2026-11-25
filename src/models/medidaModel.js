var database = require("../database/config");

function contarRespostas() {
  var instrucaoSql = `
        SELECT COUNT(id) AS totalRespostas FROM resposta;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function contarUsuarios() {
  var instrucaoSql = `
        SELECT COUNT(id) AS totalUsuarios FROM usuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function contarRespostasUsuario(idUsuario) {
  var instrucaoSql = `
        SELECT COUNT(id) AS suasRespostas FROM resposta WHERE fk_usuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMelhorQuizUsuario(idUsuario) {
  var instrucaoSql = `
        SELECT MAX(acertos) AS melhorQuiz FROM tentativa_quiz WHERE fk_usuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPersonagens() {
  var instrucaoSql = `
        SELECT
            personagem.nome AS personagem,
            COUNT(resposta.id) AS total
        FROM resposta
        JOIN personagem ON resposta.fk_personagem = personagem.id
        GROUP BY personagem.id, personagem.nome
        ORDER BY total DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPlataformas() {
  var instrucaoSql = `
        SELECT
            plataforma,
            COUNT(id) AS total
        FROM resposta
        GROUP BY plataforma
        ORDER BY total DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarZonas() {
  var instrucaoSql = `
        SELECT
            zona_favorita AS zona,
            COUNT(id) AS total
        FROM resposta
        GROUP BY zona_favorita
        ORDER BY total DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarQuizUsuario(idUsuario) {
  var instrucaoSql = `
        SELECT
            id,
            acertos,
            erros
        FROM tentativa_quiz
        WHERE fk_usuario = ${idUsuario}
        ORDER BY id ASC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  contarRespostas,
  contarUsuarios,
  contarRespostasUsuario,
  buscarMelhorQuizUsuario,
  buscarPersonagens,
  buscarPlataformas,
  buscarZonas,
  buscarQuizUsuario,
};
