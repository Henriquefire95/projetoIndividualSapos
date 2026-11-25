var vetor_perguntas = [
    "Em que ano o Sonic estreou?",
    "Qual é o nome do cientista vilão que enfrenta o Sonic?",
    "Quantas caudas o Tails tem?",
    "Quantas Esmeraldas do Caos o Sonic junta para virar Super Sonic?",
    "Qual é a primeira zona do primeiro jogo do Sonic?"
];

var vetor_opcao_a = ["1989", "Dr. Robotnik Jr.", "1", "5", "Chemical Plant Zone"];
var vetor_opcao_b = ["1991", "Dr. Eggman", "2", "6", "Casino Night Zone"];
var vetor_opcao_c = ["1994", "Dr. Metal", "3", "7", "Green Hill Zone"];
var vetor_opcao_d = ["1998", "Dr. Shadow", "4", "8", "Angel Island Zone"];

var vetor_respostas_certas = ["1991", "Dr. Eggman", "2", "7", "Green Hill Zone"];

var pergunta_atual = 0;
var acertos = 0;
var erros = 0;

function iniciar_quiz() {
    validarSessao();
    mostrar_pergunta();
}

function mostrar_pergunta() {
    p_numero_pergunta.innerHTML = `Pergunta ${pergunta_atual + 1} de ${vetor_perguntas.length}`;
    h2_pergunta.innerHTML = vetor_perguntas[pergunta_atual];

    select_resposta.innerHTML = `
        <option value="">Selecione</option>
        <option value="${vetor_opcao_a[pergunta_atual]}">${vetor_opcao_a[pergunta_atual]}</option>
        <option value="${vetor_opcao_b[pergunta_atual]}">${vetor_opcao_b[pergunta_atual]}</option>
        <option value="${vetor_opcao_c[pergunta_atual]}">${vetor_opcao_c[pergunta_atual]}</option>
        <option value="${vetor_opcao_d[pergunta_atual]}">${vetor_opcao_d[pergunta_atual]}</option>
    `;
}

function responder() {
    var resposta = select_resposta.value;
    var resposta_certa = vetor_respostas_certas[pergunta_atual];

    if (resposta == "") {
        div_exibir.innerHTML = "<span class='msg_erro'>Escolha uma resposta antes de continuar.</span>";
    } else {
        if (resposta == resposta_certa) {
            acertos++;
            div_exibir.innerHTML = `<span class='msg_certo'>Pergunta ${pergunta_atual + 1}: resposta certa!</span>`;
        } else {
            erros++;
            div_exibir.innerHTML = `<span class='msg_erro'>Pergunta ${pergunta_atual + 1}: errou. A resposta certa era ${resposta_certa}.</span>`;
        }

        b_acertos.innerHTML = acertos;
        b_erros.innerHTML = erros;
        pergunta_atual++;

        if (pergunta_atual < vetor_perguntas.length) {
            mostrar_pergunta();
        } else {
            finalizar_quiz();
        }
    }
}

function finalizar_quiz() {
    p_numero_pergunta.innerHTML = "Quiz finalizado";
    div_quiz.innerHTML = `
        <h2 class="pergunta">Você acertou ${acertos} de ${vetor_perguntas.length} perguntas!</h2>
        <button class="botao botao_amarelo" onclick="jogar_de_novo()">Jogar de novo</button>
    `;

    fetch("/quiz/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
            acertosServer: acertos,
            errosServer: erros
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                div_exibir.innerHTML = "<span class='msg_certo'>Resultado salvo! Veja no <a href='./dashboard.html'>dashboard</a>.</span>";
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
}

function jogar_de_novo() {
    window.location = "./quiz.html";
}
