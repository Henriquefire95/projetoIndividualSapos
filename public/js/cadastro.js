function cadastrar() {
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_confirmar_senha.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        div_exibir.innerHTML = "<span class='msg_erro'>Preencha todos os campos.</span>";
        return false;
    } else if (nomeVar.length < 3) {
        div_exibir.innerHTML = "<span class='msg_erro'>O nome precisa ter pelo menos 3 letras.</span>";
        return false;
    } else if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".") == -1) {
        div_exibir.innerHTML = "<span class='msg_erro'>Digite um e-mail válido, com @ e ponto.</span>";
        return false;
    } else if (senhaVar.length < 6) {
        div_exibir.innerHTML = "<span class='msg_erro'>A senha precisa ter pelo menos 6 caracteres.</span>";
        return false;
    } else if (senhaVar != confirmacaoSenhaVar) {
        div_exibir.innerHTML = "<span class='msg_erro'>As senhas não são iguais.</span>";
        return false;
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                div_exibir.innerHTML = "<span class='msg_certo'>Cadastro realizado com sucesso! Redirecionando para tela de Login...</span>";

                setTimeout(function () {
                    window.location = "login.html";
                }, 2000);
            } else {
                resposta.text().then(function (texto) {
                    div_exibir.innerHTML = `<span class='msg_erro'>${texto}</span>`;
                });
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            div_exibir.innerHTML = "<span class='msg_erro'>Não foi possível conectar ao servidor.</span>";
        });

    return false;
}
