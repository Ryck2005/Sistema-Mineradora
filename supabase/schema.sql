-- Banco de dados simples para o Sistema Mineradora
-- Rode este código no SQL Editor do Supabase.
-- Atenção: este script apaga as tabelas antigas e cria tudo novamente.

DROP TABLE IF EXISTS servicos;
DROP TABLE IF EXISTS funcionarios;
DROP TABLE IF EXISTS equipamentos;
DROP TABLE IF EXISTS setores;
DROP TABLE IF EXISTS cidades;

CREATE TABLE cidades (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  estado TEXT
);

CREATE TABLE setores (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  descricao TEXT
);

CREATE TABLE equipamentos (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  setor TEXT,
  status TEXT
);

CREATE TABLE funcionarios (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  cargo TEXT,
  cidade TEXT
);

CREATE TABLE servicos (
  id SERIAL PRIMARY KEY,
  descricao TEXT,
  equipamento TEXT,
  cidade TEXT,
  responsavel TEXT,
  status TEXT
);

INSERT INTO cidades (nome, estado) VALUES
('Crateús', 'CE'),
('Fortaleza', 'CE'),
('Sobral', 'CE');

INSERT INTO setores (nome, descricao) VALUES
('Extração', 'Setor responsável pela retirada do minério'),
('Transporte', 'Setor responsável pelo transporte interno'),
('Produção', 'Setor responsável pelo processamento do minério');

INSERT INTO equipamentos (nome, setor, status) VALUES
('Escavadeira', 'Extração', 'Em uso'),
('Caminhão', 'Transporte', 'Disponível'),
('Britador', 'Produção', 'Em manutenção');

INSERT INTO funcionarios (nome, cargo, cidade) VALUES
('João Silva', 'Operador', 'Crateús'),
('Maria Santos', 'Supervisora', 'Fortaleza'),
('Pedro Lima', 'Mecânico', 'Sobral');

INSERT INTO servicos (descricao, equipamento, cidade, responsavel, status) VALUES
('Manutenção preventiva', 'Escavadeira', 'Crateús', 'Pedro Lima', 'Pendente'),
('Transporte de minério', 'Caminhão', 'Fortaleza', 'João Silva', 'Em andamento'),
('Revisão do britador', 'Britador', 'Sobral', 'Maria Santos', 'Finalizado');
