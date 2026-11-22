# Sonic 35 — site + servidor (base: web-data-viz)

Site da comunidade Sonic 35 (login, cadastro, quiz, dashboard) no mesmo padrão de pastas do web-data-viz.

## Como rodar

1. No MySQL Workbench, execute `src/database/script-sonic35.sql` (cria o banco `sonic35` e as tabelas `usuario` e `resposta_quiz`).
2. Copie `.env.example` para `.env.dev` e coloque a sua senha do MySQL em `DB_PASSWORD`.
   (Nunca envie `.env` / `.env.dev` para o GitHub — o `.gitignore` já ignora.)
3. No terminal, dentro desta pasta: `npm i` e depois `npm start`.
4. Abra **http://localhost:3333** (não abra os `.html` com duplo clique: sem o servidor, login e cadastro não funcionam).

## Estrutura (igual ao web-data-viz)

```
app.js                      servidor Express (ambiente producao/desenvolvimento)
src/
  database/config.js        conexão MySQL (executar)
  database/script-sonic35.sql
  routes/        index.js · usuarios.js · quiz.js
  controllers/   usuarioController.js · quizController.js
  models/        usuarioModel.js · quizModel.js
public/
  index.html · login.html · cadastro.html
  dashboard/     personagens.html · mapas.html · jogos.html · quiz.html · dashboard.html   (páginas com login)
  css/           estilo.css (base, home, login/cadastro) · dashboards.css (páginas com login)
  js/            sessao.js (validarSessao, limparSessao, aguardar…) · formulario.js
  assets/imgs/   imagens (nomes em assets/LEIA-ME.txt)
```

Caminho de um pedido: `public/*.html → routes → controllers → models → banco`.

## Rotas

| Rota | O que faz |
|---|---|
| `POST /usuarios/cadastrar` | cria a conta (senha guardada como hash) |
| `POST /usuarios/autenticar` | login; devolve `id`, `nome`, `email` |
| `POST /quiz/responder` | salva as 3 respostas (refazer atualiza) |
| `GET /quiz/minha/:idUsuario` | respostas já enviadas (204 se não houver) |
| `GET /quiz/resultados` | contagem de votos usada no dashboard |

## Sessão (igual ao web-data-viz)

Depois do login/cadastro: `sessionStorage.ID_USUARIO`, `NOME_USUARIO` e `EMAIL_USUARIO`.
Cada página em `dashboard/` chama `validarSessao()` no `onload`; "Sair" chama `limparSessao()`.

## Diferenças em relação ao web-data-viz

- Banco `sonic35` (saíram `empresa`, `aquario`, `aviso`, `medida`).
- SQL com `?` (parametrizado) em vez de montar o texto com `'${valor}'` — evita SQL injection.
- A senha é guardada como hash (`crypto.scrypt`), não em texto.
