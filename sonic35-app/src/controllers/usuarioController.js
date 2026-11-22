var crypto = require("crypto");
var usuarioModel = require("../models/usuarioModel");

var EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A senha não é guardada em texto: guardamos "sal:hash" (o hash não pode ser desfeito).
function gerarHash(senha) {
    var sal = crypto.randomBytes(16).toString("hex");
    var hash = crypto.scryptSync(senha, sal, 64).toString("hex");
    return sal + ":" + hash;
}

function senhaConfere(senha, guardada) {
    var partes = String(guardada).split(":");
    if (partes.length != 2) return false;
    var esperado = Buffer.from(partes[1], "hex");
    var calculado = crypto.scryptSync(senha, partes[0], 64);
    return esperado.length == calculado.length && crypto.timingSafeEqual(esperado, calculado);
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || email == "") {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.buscarPorEmail(String(email).trim().toLowerCase())
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);

                    // mesma mensagem para "e-mail não existe" e "senha errada"
                    if (resultadoAutenticar.length == 1 && senhaConfere(String(senha), resultadoAutenticar[0].senha)) {
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        });
                    } else {
                        res.status(403).send("E-mail ou senha incorretos.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Recupera os valores enviados pelo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faz as validações dos valores
    if (nome == undefined || String(nome).trim().length < 2) {
        res.status(400).send("Conte como podemos chamar você.");
    } else if (email == undefined || !EMAIL_VALIDO.test(String(email).trim())) {
        res.status(400).send("Esse e-mail não parece válido.");
    } else if (senha == undefined || String(senha).length < 8) {
        res.status(400).send("Use pelo menos 8 caracteres na senha.");
    } else {

        nome = String(nome).trim();
        email = String(email).trim().toLowerCase();

        usuarioModel.buscarPorEmail(email)
            .then(function (existente) {
                if (existente.length > 0) {
                    res.status(409).send("Já existe uma conta com esse e-mail.");
                    return;
                }

                return usuarioModel.cadastrar(nome, email, gerarHash(String(senha)))
                    .then(function (resultado) {
                        res.status(201).json({ id: resultado.insertId, email: email, nome: nome });
                    });
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}