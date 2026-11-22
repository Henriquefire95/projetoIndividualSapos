var mysql = require("mysql2");

// Conexão com o MySQL Server (valores vêm do .env / .env.dev)
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

// executar(instrucao, valores): os "?" da instrução são preenchidos pela lista "valores".
// Assim o mysql2 trata os valores com segurança (evita SQL injection).
function executar(instrucao, valores) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU .env.dev OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect(function (erroConexao) {
            if (erroConexao) {
                return reject(erroConexao);
            }
            conexao.query(instrucao, valores, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    return reject(erro);
                }
                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};
