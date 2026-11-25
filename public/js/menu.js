function montar_menu() {
    var nome = sessionStorage.NOME_USUARIO;

    if (nome != undefined) {
        div_menu_usuario.innerHTML = `
            <p>Olá, <b>${nome}</b></p>
            <a href="dashboard/pesquisa.html" class="botao botao_amarelo">Pesquisa</a>
            <a href="dashboard/quiz.html" class="botao botao_amarelo">Quiz</a>
            <a href="dashboard/dashboard.html" class="botao botao_vermelho">Dashboard</a>
            <button class="botao botao_contorno" onclick="sair_home()">Sair</button>
        `;
        a_botao_principal.href = "dashboard/pesquisa.html";
        a_botao_principal.innerHTML = "Ir para a pesquisa";
        a_botao_convite.href = "dashboard/pesquisa.html";
        a_botao_convite.innerHTML = "Responder pesquisa";
    } else {
        div_menu_usuario.innerHTML = `
            <a href="login.html" class="botao botao_contorno">Login</a>
            <a href="cadastro.html" class="botao botao_vermelho">Cadastro</a>
        `;
    }
}

function sair_home() {
    sessionStorage.clear();
    window.location = "index.html";
}
