function enviar_pesquisa() {
    var idUsuarioVar = sessionStorage.ID_USUARIO;
    var idPersonagemVar = select_personagem.value;
    var jogoFavoritoVar = select_jogo.value;
    var zonaFavoritaVar = select_zona.value;
    var plataformaVar = select_plataforma.value;
    var tempoFaVar = select_tempo.value;

    if (idPersonagemVar == "" || jogoFavoritoVar == "" || zonaFavoritaVar == "" || plataformaVar == "" || tempoFaVar == "") {
        div_exibir.innerHTML = "<span class='msg_erro'>Responda todas as perguntas.</span>";
        return false;
    }

    fetch("/respostas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioVar,
            idPersonagemServer: idPersonagemVar,
            jogoFavoritoServer: jogoFavoritoVar,
            zonaFavoritaServer: zonaFavoritaVar,
            plataformaServer: plataformaVar,
            tempoFaServer: tempoFaVar
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                div_exibir.innerHTML = "<span class='msg_certo'>Respostas enviadas! Abrindo o dashboard...</span>";
                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1500);
            } else {
                resposta.text().then(function (texto) {
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
