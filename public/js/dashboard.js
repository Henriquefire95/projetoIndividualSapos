function carregar_dashboard() {
    validarSessao();

    var idUsuario = sessionStorage.ID_USUARIO;
    if (idUsuario == undefined) {
        return;
    }

    buscar_kpis(idUsuario);
    buscar_personagens();
    buscar_plataformas();
    buscar_zonas();
    buscar_quiz(idUsuario);
}

function buscar_kpis(idUsuario) {
    fetch(`/medidas/kpis/${idUsuario}`, { cache: "no-store" })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    div_total_respostas.innerHTML = dados.totalRespostas;
                    div_total_usuarios.innerHTML = dados.totalUsuarios;
                    div_suas_respostas.innerHTML = dados.suasRespostas;

                    if (dados.melhorQuiz != null) {
                        div_melhor_quiz.innerHTML = dados.melhorQuiz + " de 5";
                    } else {
                        div_melhor_quiz.innerHTML = "-";
                    }
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro na obtenção das KPIs: " + erro.message);
        });
}

function buscar_personagens() {
    fetch("/medidas/personagens", { cache: "no-store" })
        .then(function (resposta) {
            if (resposta.status == 200) {
                resposta.json().then(function (dados) {
                    plotar_grafico_personagens(dados);
                });
            } else {
                div_personagem_top.innerHTML = "-";
                plotar_grafico_personagens([]);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar personagens: " + erro.message);
        });
}

function plotar_grafico_personagens(dados) {
    var vetor_personagens = [];
    var vetor_qtd_personagens = [];
    var maior_quantidade = 0;
    var personagem_top = "-";

    for (var i = 0; i < dados.length; i++) {
        var registro = dados[i];
        vetor_personagens.push(registro.personagem);
        vetor_qtd_personagens.push(registro.total);

        if (registro.total > maior_quantidade) {
            maior_quantidade = registro.total;
            personagem_top = registro.personagem;
        }
    }

    div_personagem_top.innerHTML = personagem_top;

    new Chart(canvas_personagens, {
        type: "bar",
        data: {
            labels: vetor_personagens,
            datasets: [{
                label: "Quantidade de fãs",
                data: vetor_qtd_personagens,
                backgroundColor: "#0054A6",
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: "y",
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function buscar_plataformas() {
    fetch("/medidas/plataformas", { cache: "no-store" })
        .then(function (resposta) {
            if (resposta.status == 200) {
                resposta.json().then(function (dados) {
                    plotar_grafico_plataformas(dados);
                });
            } else {
                plotar_grafico_plataformas([]);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar plataformas: " + erro.message);
        });
}

function plotar_grafico_plataformas(dados) {
    var vetor_plataformas = [];
    var vetor_qtd_plataformas = [];

    for (var i = 0; i < dados.length; i++) {
        vetor_plataformas.push(dados[i].plataforma);
        vetor_qtd_plataformas.push(dados[i].total);
    }

    new Chart(canvas_plataformas, {
        type: "pie",
        data: {
            labels: vetor_plataformas,
            datasets: [{
                label: "Quantidade de fãs",
                data: vetor_qtd_plataformas,
                backgroundColor: ["#0054A6", "#FFD700", "#E60012"]
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right"
                }
            }
        }
    });
}

function buscar_zonas() {
    fetch("/medidas/zonas", { cache: "no-store" })
        .then(function (resposta) {
            if (resposta.status == 200) {
                resposta.json().then(function (dados) {
                    plotar_grafico_zonas(dados);
                });
            } else {
                plotar_grafico_zonas([]);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar zonas: " + erro.message);
        });
}

function plotar_grafico_zonas(dados) {
    var vetor_zonas = [];
    var vetor_qtd_zonas = [];

    for (var i = 0; i < dados.length; i++) {
        vetor_zonas.push(dados[i].zona);
        vetor_qtd_zonas.push(dados[i].total);
    }

    new Chart(canvas_zonas, {
        type: "bar",
        data: {
            labels: vetor_zonas,
            datasets: [{
                label: "Quantidade de fãs",
                data: vetor_qtd_zonas,
                backgroundColor: "#FFD700",
                borderRadius: 8
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function buscar_quiz(idUsuario) {
    fetch(`/medidas/quiz/${idUsuario}`, { cache: "no-store" })
        .then(function (resposta) {
            if (resposta.status == 200) {
                resposta.json().then(function (dados) {
                    plotar_grafico_quiz(dados);
                });
            } else {
                plotar_grafico_quiz([]);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar resultados do quiz: " + erro.message);
        });
}

function plotar_grafico_quiz(dados) {
    var vetor_tentativas = [];
    var vetor_acertos = [];

    for (var i = 0; i < dados.length; i++) {
        vetor_tentativas.push("Tentativa " + (i + 1));
        vetor_acertos.push(dados[i].acertos);
    }

    new Chart(canvas_quiz, {
        type: "line",
        data: {
            labels: vetor_tentativas,
            datasets: [{
                label: "Acertos",
                data: vetor_acertos,
                borderColor: "#E60012",
                backgroundColor: "#E60012"
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}
