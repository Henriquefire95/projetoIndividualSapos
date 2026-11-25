var database = require("../database/config");

function cadastrar(idUsuario, acertos, erros) {
    console.log("ACESSEI O QUIZ MODEL \n function cadastrar():", idUsuario, acertos, erros);
    var instrucaoSql = `
        INSERT INTO tentativa_quiz (fk_usuario, acertos, erros)
        VALUES (${idUsuario}, ${acertos}, ${erros});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
