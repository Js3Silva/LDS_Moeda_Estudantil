TRUNCATE TABLE instituicao_ensino RESTART IDENTITY CASCADE;

INSERT INTO instituicao_ensino (nome, endereco, telefone, email, cnpj) VALUES
('Pontifícia Universidade Católica de Minas Gerais (PUC-MG)', 'Av. Dom José Gaspar, 500 - Belo Horizonte, MG', '(31) 3349-7000', 'contato@pucminas.br', '67890123000174'),
('Universidade Federal de Minas Gerais (UFMG)', 'Av. Antônio Carlos, 6627 - Belo Horizonte, MG', '(31) 3409-7000', 'contato@ufmg.br', '34567890000102'),
('Universidade de São Paulo (USP)', 'R. da Reitoria, 374 - São Paulo, SP', '(11) 3091-3116', 'contato@usp.br', '12345678000195'),
('Universidade Estadual de Campinas (UNICAMP)', 'Cidade Universitária Zeferino Vaz - Campinas, SP', '(19) 3521-2121', 'contato@unicamp.br', '23456789000109'),
('Universidade Federal do Rio de Janeiro (UFRJ)', 'Av. Pedro Calmon, 550 - Rio de Janeiro, RJ', '(21) 3938-8000', 'contato@ufrj.br', '45678901000116');
