function entrar() {
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

    if (emailVar == "" || senhaVar == "") {
        div_exibir.innerHTML = "<span class='msg_erro'>Preencha o e-mail e a senha.</span>";
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!");

            if (resposta.ok) {
                resposta.json().then(function (json) {
                    console.log(json);
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.EMAIL_USUARIO = json.email;

                    div_exibir.innerHTML = "<span class='msg_certo'>Login realizado! Carregando...</span>";
                    setTimeout(function () {
                        window.location = "./dashboard/pesquisa.html";
                    }, 1000);
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(function (texto) {
                    console.error(texto);
                    div_exibir.innerHTML = `<span class='msg_erro'>${texto}</span>`;
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            div_exibir.innerHTML = "<span class='msg_erro'>Não foi possível conectar ao servidor.</span>";
        });

    return false;
}
