-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE DVC6;

USE DVC6;

CREATE TABLE hospital (
  id_hospital INT PRIMARY KEY auto_increment,
  nome_fantasia VARCHAR(100),
  cnpj VARCHAR(18),
  email VARCHAR(30),
  senha VARCHAR(30),
  cep CHAR(8),
  numero INT,
  telefone VARCHAR(15),
  site VARCHAR(45)
  );
  
CREATE TABLE funcionario (
  id_funcionario INT PRIMARY KEY auto_increment,
  nome_funcionario VARCHAR(45),
  senha VARCHAR(45),
  email VARCHAR(45),
  cargo VARCHAR(30),
  fkHospital INT,
  CONSTRAINT fkHospital_funcionario FOREIGN KEY (fkHospital) REFERENCES hospital (id_hospital)
);

CREATE TABLE pre_check_in (
  id_pre_check_in INT PRIMARY KEY auto_increment,
  nome VARCHAR(45),
  cpf VARCHAR(14),
  rg VARCHAR(12),
  idade INT,
  email VARCHAR(45),
  data_cadastro DATETIME,
  fkHospital INT,
  CONSTRAINT fkHospital_pre FOREIGN KEY (fkHospital) REFERENCES hospital (id_hospital)
  );

CREATE TABLE feedback (
	id_feedback INT PRIMARY KEY auto_increment,
	nota INT,
	texto VARCHAR(100),
	dtHora DATETIME,
	fkFuncionario INT,
	CONSTRAINT fkFuncionario_feedback FOREIGN KEY(fkFuncionario) REFERENCES funcionario (id_funcionario)
  );

CREATE TABLE totem (
  id_totem INT PRIMARY KEY auto_increment,
  localizacao VARCHAR(45),
  nome_maquina VARCHAR(45),
  status_atual VARCHAR(5),
  fkHospital INT,
  CONSTRAINT fkHospital_totem FOREIGN KEY (fkHospital) REFERENCES hospital (id_hospital)
  );
  
CREATE TABLE tipo_componente (
	id_tipo_componente INT PRIMARY KEY auto_increment,
	nome VARCHAR(45),
	medida_componente VARCHAR(20)
);

CREATE TABLE metricas (
	id_metricas INT PRIMARY KEY auto_increment,
	limite_cpu_perigo FLOAT,
	limite_disco_perigo FLOAT,
	limite_ram_perigo FLOAT,
	limite_ram_alerta FLOAT,
	limite_cpu_alerta FLOAT,
	limite_disco_alerta FLOAT
);

CREATE TABLE componente (
  id_componente INT PRIMARY KEY auto_increment,
  total_componente FLOAT,
  fkTipoComponente INT,
  CONSTRAINT fkTipo_componente FOREIGN KEY (fkTipoComponente) REFERENCES tipo_componente (id_tipo_componente),
  fkTotem INT,
  CONSTRAINT fkTotem_componente FOREIGN KEY (fkTotem) REFERENCES totem (id_totem),
  fkMetricas INT,
  CONSTRAINT fkMetricas_componente  FOREIGN KEY (fkMetricas) REFERENCES metricas (id_metricas)
  );

CREATE TABLE leitura (
  id_leitura INT PRIMARY KEY auto_increment,
  data_hora_atual DATETIME NOT NULL DEFAULT current_timestamp,
  consumo FLOAT,
  fkComponente INT,
  CONSTRAINT fkComponente_leitura FOREIGN KEY (fkComponente) REFERENCES componente (id_componente)
  );

/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);


