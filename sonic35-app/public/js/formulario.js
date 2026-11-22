// Ajudas dos formulários de login e cadastro (mostrar senha, mensagens de erro por campo)

// Mostrar / ocultar senha
document.querySelectorAll(".olho").forEach(function (botao) {
    botao.addEventListener("click", function () {
        var campo = botao.parentElement.querySelector("input");
        var visivel = campo.type == "password";
        campo.type = visivel ? "text" : "password";
        botao.setAttribute("aria-pressed", String(visivel));
        botao.setAttribute("aria-label", visivel ? "Ocultar senha" : "Mostrar senha");
    });
});

// Mostra (ou limpa, com mensagem vazia) o erro embaixo do campo. A mensagem fica no <p id="erro_ID_DO_CAMPO">.
function mostrarErro(campo, mensagem) {
    var aviso = document.getElementById("erro_" + campo.id);
    if (!aviso) return false;

    if (mensagem) {
        aviso.textContent = mensagem;
        aviso.hidden = false;
        campo.setAttribute("aria-invalid", "true");
        campo.setAttribute("aria-describedby", aviso.id);
    } else {
        aviso.hidden = true;
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");
    }
    return Boolean(mensagem);
}

function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
}

// limpa o erro assim que a pessoa volta a digitar
document.querySelectorAll("input").forEach(function (campo) {
    campo.addEventListener("input", function () {
        mostrarErro(campo, "");
    });
});
