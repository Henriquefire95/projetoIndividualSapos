-- Arquivo de criação do banco de dados do Projeto Individual: Sonic 35 Anos
-- Execute estes comandos no MySQL Workbench antes de rodar a API.

CREATE DATABASE sonic35;

USE sonic35;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(50),
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personagem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40),
    tipo VARCHAR(20)
);

CREATE TABLE resposta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    fk_personagem INT,
    jogo_favorito VARCHAR(60),
    zona_favorita VARCHAR(60),
    plataforma VARCHAR(40),
    tempo_fa VARCHAR(40),
    dt_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_personagem) REFERENCES personagem(id)
);

CREATE TABLE tentativa_quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    acertos INT,
    erros INT,
    dt_tentativa DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

INSERT INTO personagem (nome, tipo) VALUES
    ('Sonic', 'Herói'),
    ('Tails', 'Herói'),
    ('Knuckles', 'Herói'),
    ('Amy Rose', 'Herói'),
    ('Shadow', 'Anti-herói'),
    ('Silver', 'Herói'),
    ('Dr. Eggman', 'Vilão'),
    ('Metal Sonic', 'Vilão');

SELECT * FROM usuario;
SELECT * FROM personagem;
SELECT * FROM resposta;
SELECT * FROM tentativa_quiz;
