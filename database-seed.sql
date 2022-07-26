-- Sample data
-- Run these queries after executing the migrations

-- Login email: test@user.com
-- Login password: qwerty123
INSERT INTO logins VALUES
(17906242246293, 'test@user.com', '$2a$10$wVhF2x4TG1p8/TV4a67NheaNICIqH/kmbHVpqeWBjs0acOtPpvpEu');

INSERT INTO roles VALUES
(17970969105370, 'Desenvolvedor de software', 'Desenvolve sistemas', 3800.00),
(18169553160574, 'Gerente de projetos', 'Gerencia o projeto', 4500.00),
(18175840791591, 'Analista de teste', 'Garante a qualidade', 4000.00);

INSERT INTO departments VALUES
(18261018874051, 'Tecnologia da Informação', 'Utiliza ferramentas tecnológicas'),
(18269195074167, 'Pesquisa e Desenvolvimento', 'Cria ou aprimora um produto'),
(18275945363066, 'Marketing', 'Promove e vende produtos');

INSERT INTO cost_center VALUES
(18603574308134, 'Equipamentos', 345.28, 18261018874051),
(18609997655155, 'Viagens corporativas', 123.40, 18261018874051),
(18618536847156, 'Equipamentos', 234.34, 18269195074167),
(18625861680465, 'Viagens corporativas', 45.70, 18269195074167);

INSERT INTO users VALUES
(18954778113819, 'Ana Barros Costa', 17970969105370, 18261018874051),
(18961914763553, 'João Oliveira Cunha', 17970969105370, 18275945363066),
(18969808899502, 'Pedro Costa Santos', 18175840791591, 18261018874051),
(18975261314349, 'Alice Carvalho Lima', 18175840791591, 18275945363066);
