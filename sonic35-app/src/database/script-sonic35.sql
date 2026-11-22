-- Banco do Sonic 35. Execute este script inteiro no MySQL Workbench antes de rodar o projeto.
CREATE DATABASE sonic35;
USE sonic35;

CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,      -- guarda o "hash" da senha, nunca a senha em si
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cada usuário responde o quiz uma vez (refazer atualiza a resposta anterior).
CREATE TABLE IF NOT EXISTS resposta_quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL UNIQUE,
    jogo_mais VARCHAR(30) NOT NULL,
    jogo_menos VARCHAR(30) NOT NULL,
    personagem VARCHAR(20) NOT NULL,
    respondido_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Consultas que alimentam o dashboard (a API faz o mesmo):
-- SELECT jogo_mais AS opcao, COUNT(*) AS total FROM resposta_quiz GROUP BY jogo_mais ORDER BY total DESC;
-- SELECT personagem AS opcao, COUNT(*) AS total FROM resposta_quiz GROUP BY personagem ORDER BY total DESC;
