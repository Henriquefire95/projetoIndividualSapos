var database = require("../database/config")

function buscarPorEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorEmail(): ", email);
    var instrucaoSql = `
        SELECT id, nome, email, senha FROM usuario WHERE email = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email]);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senhaHash) {
    console.log("ACESSEI O USUARIO MODEL \n function cadastrar():", nome, email);

    // Os "?" são preenchidos pela lista de valores (evita SQL injection)
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, email, senhaHash]);
}

module.exports = {
    buscarPorEmail,
    cadastrar
};