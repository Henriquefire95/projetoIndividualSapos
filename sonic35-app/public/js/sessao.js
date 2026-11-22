// sessão (mesmo padrão do web-data-viz: dados da pessoa logada ficam no sessionStorage)
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        if (b_usuario) {
            b_usuario.innerHTML = nome;
        }
    } else {
        window.location = "../login.html?restrito=1";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}

// carregamento (loading): desabilita o botão do formulário enquanto o servidor responde
function aguardar() {
    var botao = document.querySelector(".botao-form");
    if (botao) {
        botao.disabled = true;
    }
}

function finalizarAguardar(texto) {
    var botao = document.querySelector(".botao-form");
    if (botao) {
        botao.disabled = false;
    }

    var status = document.getElementById("status");
    if (texto && status) {
        status.textContent = texto;
        status.hidden = false;
    }
}
