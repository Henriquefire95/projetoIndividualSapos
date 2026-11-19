// Sonic 35 — comportamento compartilhado por todas as páginas.
// Tudo roda no navegador: não há servidor, então login e cadastro são demonstrações
// (o nome fica salvo só neste navegador, para aparecer em "Olá, …").

const guardado = {
  ler(chave) { try { return localStorage.getItem(chave); } catch (e) { return null; } },
  gravar(chave, valor) { try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento */ } },
  apagar(chave) { try { localStorage.removeItem(chave); } catch (e) { /* sem armazenamento */ } },
};

const pagina = document.body.dataset.pagina || 'inicio';

/* ---------- Acesso: sem login, só a home (e login/cadastro) abre ---------- */
// Demonstração no navegador: não há servidor, então "logado" é só uma marca guardada aqui.
const logado = () => guardado.ler('sonic35_logado') === '1';
const entrar = (nome) => { guardado.gravar('sonic35_logado', '1'); guardado.gravar('sonic35_nome', nome); };
const sair = () => { guardado.apagar('sonic35_logado'); guardado.apagar('sonic35_nome'); guardado.apagar('sonic35_quiz'); };

if (['personagens', 'mapas', 'jogos', 'quiz', 'dashboard'].includes(pagina) && !logado()) {
  window.location.replace('login.html?restrito=1');
}

// Home: quem já entrou vê "Sair" e "Explorar" no lugar de "Entrar" e "Criar conta".
if (pagina === 'inicio' && logado()) {
  const entrarBtn = document.querySelector('.acesso a[href="login.html"]');
  const criarBtn = document.querySelector('.acesso a[href="cadastro.html"]');
  if (entrarBtn) { entrarBtn.textContent = 'Sair'; entrarBtn.href = 'index.html'; entrarBtn.addEventListener('click', sair); }
  if (criarBtn) { criarBtn.textContent = 'Explorar →'; criarBtn.href = 'personagens.html'; }
  const comecar = document.querySelector('.botao-comunidade');
  if (comecar) { comecar.textContent = 'Explorar agora →'; comecar.href = 'personagens.html'; }
}

// Login/cadastro: quem já está logado vai direto para a comunidade; aviso quando veio de página restrita.
if (['login', 'cadastro'].includes(pagina) && logado()) window.location.replace('personagens.html');
if (pagina === 'login' && new URLSearchParams(location.search).has('restrito')) {
  const aviso = document.getElementById('status');
  if (aviso) { aviso.textContent = 'Entre ou crie uma conta para acessar essa página.'; aviso.hidden = false; }
}

/* ---------- Menu da home: item clicado vira o ativo ---------- */
document.querySelectorAll('.item-nav').forEach((item, _, todos) => {
  item.addEventListener('click', () => {
    todos.forEach((outro) => { outro.classList.remove('ativo'); outro.removeAttribute('aria-current'); });
    item.classList.add('ativo');
    item.setAttribute('aria-current', 'page');
  });
});

/* ---------- "Olá, …" e "Sair" nas páginas da comunidade ---------- */
const nomeSalvo = guardado.ler('sonic35_nome');
document.querySelectorAll('[data-usuario]').forEach((el) => {
  el.textContent = nomeSalvo ? `Olá, ${nomeSalvo}` : 'Olá, Player 01';
});

document.querySelectorAll('[data-sair]').forEach((link) => {
  link.addEventListener('click', sair);
});

/* ---------- Mostrar / ocultar senha ---------- */
document.querySelectorAll('.olho').forEach((botao) => {
  botao.addEventListener('click', () => {
    const campo = botao.parentElement.querySelector('input');
    const visivel = campo.type === 'password';
    campo.type = visivel ? 'text' : 'password';
    botao.setAttribute('aria-pressed', String(visivel));
    botao.setAttribute('aria-label', visivel ? 'Ocultar senha' : 'Mostrar senha');
  });
});

/* ---------- Validação dos formulários ---------- */
function mostrarErro(campo, mensagem) {
  const aviso = document.getElementById(`erro-${campo.id}`);
  if (!aviso) return;
  if (mensagem) {
    aviso.textContent = mensagem;
    aviso.hidden = false;
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', aviso.id);
  } else {
    aviso.hidden = true;
    campo.removeAttribute('aria-invalid');
    campo.removeAttribute('aria-describedby');
  }
  return Boolean(mensagem);
}

const emailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);

function ligarFormulario(form, validar, aoSucesso) {
  if (!form) return;

  // Limpa o erro assim que a pessoa volta a digitar.
  form.querySelectorAll('input').forEach((campo) => {
    campo.addEventListener('input', () => mostrarErro(campo, ''));
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const primeiroErro = validar(form);
    if (primeiroErro) { primeiroErro.focus(); return; }

    const botao = form.querySelector('.botao-form');
    botao.disabled = true;
    const status = document.getElementById('status');
    aoSucesso(form, status);
  });
}

// Cada validador mostra todos os erros e devolve o primeiro campo inválido.
ligarFormulario(
  document.getElementById('form-login'),
  (form) => {
    const email = form.email, senha = form.senha;
    const erros = [
      !email.value.trim() ? [email, 'Digite seu e-mail.']
        : !emailValido(email.value.trim()) ? [email, 'Esse e-mail não parece válido.'] : [email, ''],
      !senha.value ? [senha, 'Digite sua senha.'] : [senha, ''],
    ];
    erros.forEach(([campo, msg]) => mostrarErro(campo, msg));
    return (erros.find(([, msg]) => msg) || [])[0];
  },
  (form, status) => {
    const mail = form.email.value.trim().split('@')[0];
    entrar(guardado.ler('sonic35_nome') || mail.charAt(0).toUpperCase() + mail.slice(1));
    status.textContent = 'Checkpoint carregado! Indo para a comunidade…';
    status.hidden = false;
    setTimeout(() => { window.location.href = 'personagens.html'; }, 700);
  },
);

ligarFormulario(
  document.getElementById('form-cadastro'),
  (form) => {
    const { nome, email, senha, confirmar } = form;
    const erros = [
      [nome, nome.value.trim().length < 2 ? 'Conte como podemos chamar você.' : ''],
      [email, !email.value.trim() ? 'Digite seu e-mail.'
        : !emailValido(email.value.trim()) ? 'Esse e-mail não parece válido.' : ''],
      [senha, senha.value.length < 8 ? 'Use pelo menos 8 caracteres.' : ''],
      [confirmar, !confirmar.value ? 'Digite a senha novamente.'
        : confirmar.value !== senha.value ? 'As senhas não são iguais.' : ''],
    ];
    erros.forEach(([campo, msg]) => mostrarErro(campo, msg));
    return (erros.find(([, msg]) => msg) || [])[0];
  },
  (form, status) => {
    entrar(form.nome.value.trim().split(/\s+/)[0]);
    status.textContent = 'Conta criada! Bem-vindo ao time.';
    status.hidden = false;
    setTimeout(() => { window.location.href = 'personagens.html'; }, 900);
  },
);

/* ---------- Personagens: busca + filtro ---------- */
const grade = document.getElementById('grade');
if (grade) {
  const busca = document.getElementById('busca');
  const filtro = document.getElementById('filtro');
  const botaoFiltro = filtro.querySelector('.filtro-botao');
  const menu = document.getElementById('filtro-menu');
  const opcoes = [...menu.querySelectorAll('li')];
  const cartoes = [...grade.querySelectorAll('.personagem')];
  const vazio = document.getElementById('vazio');
  const contagem = document.getElementById('contagem');
  let categoria = 'todos';

  const normalizar = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  function aplicar() {
    const termo = normalizar(busca.value.trim());
    let visiveis = 0;
    cartoes.forEach((cartao) => {
      const combina = (categoria === 'todos' || cartao.dataset.categoria === categoria)
        && normalizar(cartao.dataset.nome).includes(termo);
      cartao.hidden = !combina;
      if (combina) visiveis += 1;
    });
    vazio.hidden = visiveis > 0;
    contagem.textContent = `${visiveis} ${visiveis === 1 ? 'personagem' : 'personagens'}  •  Heróis e vilões`;
  }

  function abrirMenu(abrir) {
    menu.hidden = !abrir;
    botaoFiltro.setAttribute('aria-expanded', String(abrir));
    if (abrir) (opcoes.find((o) => o.getAttribute('aria-selected') === 'true') || opcoes[0]).focus();
  }

  function escolher(opcao) {
    categoria = opcao.dataset.valor;
    opcoes.forEach((o) => o.setAttribute('aria-selected', String(o === opcao)));
    botaoFiltro.textContent = `${opcao.textContent}  ↓`;
    abrirMenu(false);
    botaoFiltro.focus();
    aplicar();
  }

  botaoFiltro.addEventListener('click', () => abrirMenu(menu.hidden));
  opcoes.forEach((opcao) => {
    opcao.addEventListener('click', () => escolher(opcao));
    opcao.addEventListener('keydown', (e) => {
      const i = opcoes.indexOf(opcao);
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); escolher(opcao); }
      if (e.key === 'ArrowDown') { e.preventDefault(); opcoes[(i + 1) % opcoes.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); opcoes[(i - 1 + opcoes.length) % opcoes.length].focus(); }
    });
  });

  document.addEventListener('click', (e) => { if (!filtro.contains(e.target)) abrirMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { abrirMenu(false); botaoFiltro.focus(); }
  });

  busca.addEventListener('input', aplicar);
}

/* ---------- Dashboard: destaca a fatia ao passar o mouse na legenda ou no gráfico ---------- */
const painelVotos = document.getElementById('painel-votos');
if (painelVotos) {
  const itens = painelVotos.querySelectorAll('[data-id]');
  const destacar = (id) => {
    painelVotos.classList.toggle('rosca-ativa', id !== null);
    itens.forEach((el) => el.classList.toggle('em-foco', el.dataset.id === id));
  };
  itens.forEach((el) => {
    el.addEventListener('mouseenter', () => destacar(el.dataset.id));
    el.addEventListener('mouseleave', () => destacar(null));
  });
}

/* ---------- Quiz: uma alternativa por pergunta, progresso e botão de continuar ---------- */
const formQuiz = document.getElementById('quiz');
if (formQuiz) {
  const perguntas = ['q1', 'q2', 'q3'];
  const barra = document.getElementById('progresso-barra');
  const trilho = barra.parentElement;
  const contador = document.getElementById('contador');
  const continuar = document.getElementById('continuar');
  const texto = document.getElementById('conclusao-texto');

  const respostas = () => Object.fromEntries(perguntas.map((q) => {
    const marcada = formQuiz.querySelector(`input[name="${q}"]:checked`);
    return [q, marcada ? marcada.value : null];
  }));

  function atualizar() {
    const r = respostas();
    const feitas = perguntas.filter((q) => r[q]).length;

    formQuiz.querySelectorAll('.alternativa').forEach((el) => {
      el.classList.toggle('marcada', el.querySelector('input').checked);
    });
    perguntas.forEach((q) => {
      const li = formQuiz.querySelector(`.itens-resumo li[data-q="${q}"]`);
      li.classList.toggle('feito', Boolean(r[q]));
      const rot = li.querySelector('.rot');
      let valor = rot.querySelector('.valor');
      if (r[q]) {
        if (!valor) { valor = document.createElement('span'); valor.className = 'valor'; rot.appendChild(valor); }
        valor.textContent = `  ·  ${r[q]}`;
      } else if (valor) valor.remove();
    });

    barra.style.width = `${(feitas / 3) * 100}%`;
    trilho.setAttribute('aria-valuenow', String(feitas));
    contador.textContent = `${feitas} de 3 respondidas`;

    const pronto = feitas === 3;
    continuar.setAttribute('aria-disabled', String(!pronto));
    continuar.tabIndex = pronto ? 0 : -1;
    texto.className = pronto ? 'pronto' : '';
    texto.textContent = pronto
      ? 'Tudo certo! Seu checkpoint está salvo.'
      : 'Responda às 3 perguntas para continuar para o dashboard.';
    if (pronto) guardado.gravar('sonic35_quiz', JSON.stringify(r));
  }

  // Recupera respostas salvas neste navegador.
  try {
    const salvo = JSON.parse(guardado.ler('sonic35_quiz') || 'null');
    if (salvo) perguntas.forEach((q) => {
      const campo = [...formQuiz.querySelectorAll(`input[name="${q}"]`)].find((i) => i.value === salvo[q]);
      if (campo) campo.checked = true;
    });
  } catch (e) { /* ignora dado inválido */ }

  formQuiz.addEventListener('change', atualizar);
  continuar.addEventListener('click', (e) => {
    if (continuar.getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      texto.className = 'aviso-quiz';
      texto.textContent = 'Falta responder alguma pergunta antes de continuar.';
      const faltou = perguntas.find((q) => !formQuiz.querySelector(`input[name="${q}"]:checked`));
      formQuiz.querySelector(`input[name="${faltou}"]`).focus();
    }
  });
  atualizar();
}
