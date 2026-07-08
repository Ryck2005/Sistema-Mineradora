-- Use este arquivo se você já tinha criado o banco da versão anterior.
-- Ele adiciona a tabela setores e o campo cidade em servicos sem apagar tudo.

CREATE TABLE IF NOT EXISTS setores (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  descricao TEXT
);

ALTER TABLE servicos ADD COLUMN IF NOT EXISTS cidade TEXT;

INSERT INTO setores (nome, descricao)
SELECT 'Extração', 'Setor responsável pela retirada do minério'
WHERE NOT EXISTS (SELECT 1 FROM setores WHERE nome = 'Extração');

INSERT INTO setores (nome, descricao)
SELECT 'Transporte', 'Setor responsável pelo transporte interno'
WHERE NOT EXISTS (SELECT 1 FROM setores WHERE nome = 'Transporte');

INSERT INTO setores (nome, descricao)
SELECT 'Produção', 'Setor responsável pelo processamento do minério'
WHERE NOT EXISTS (SELECT 1 FROM setores WHERE nome = 'Produção');
