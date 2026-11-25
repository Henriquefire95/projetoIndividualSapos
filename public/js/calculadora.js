var vetor_itens = ["Pelúcia Sonic 35 anos", "Camiseta comemorativa", "Box colecionador", "Jogo edição especial"];
var vetor_precos = [120, 80, 350, 250];

function calcular() {
    var posicao_item = Number(select_item.value);
    var quantidade = Number(ipt_quantidade.value);
    var pagamento = select_pagamento.value;

    if (ipt_quantidade.value == "") {
        div_exibir.innerHTML = "<span class='msg_erro'>Digite a quantidade.</span>";
    } else if (quantidade <= 0) {
        div_exibir.innerHTML = "<span class='msg_erro'>A quantidade precisa ser maior que zero.</span>";
    } else {
        var nome_item = vetor_itens[posicao_item];
        var preco = vetor_precos[posicao_item];
        var valor_sem_desconto = preco * quantidade;
        var desconto_por_item = 0;

        if (pagamento == "pix") {
            desconto_por_item = 10;
        } else if (pagamento == "boleto") {
            desconto_por_item = 5;
        } else {
            desconto_por_item = 0;
        }

        var economia = desconto_por_item * quantidade;
        var total = valor_sem_desconto - economia;

        div_exibir.innerHTML = `
            <div class="card_resultado">
                <p><b>${quantidade} x ${nome_item}</b></p>
                <p>Valor sem desconto: R$ ${valor_sem_desconto}</p>
                <p><span class='msg_certo'>Você economiza: R$ ${economia}</span></p>
                <p class="resultado_total">Total: R$ ${total}</p>
            </div>
        `;
    }
}
