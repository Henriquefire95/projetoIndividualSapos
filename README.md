# Projeto Individual — Sonic 35 Anos

Aplicação web desenvolvida para a disciplina de **Pesquisa e Inovação** da **São Paulo Tech School (SPTech)**, seguindo a arquitetura do [BandTec/web-data-viz](https://github.com/BandTec/web-data-viz).

## Como executar localmente

1. Execute o script `src/database/script-tabelas.sql` no **MySQL Workbench** para criar o banco `sonic35` e as tabelas (`usuario`, `personagem`, `resposta` e `tentativa_quiz`).
2. Configure suas credenciais do MySQL no arquivo `.env.dev` (use `.env.example` como referência).
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Acesse `http://localhost:3333` no navegador.
