var database = require('../database/config');

function listar() {
  const query = `
        SELECT * FROM hospital;
    `;

  return database.executar(query);
}

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM hospital WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function cadastrar(
  nomeFantasia,
  site,
  telefone,
  email,
  senha,
  cep,
  estado,
  cidade,
  bairro,
  logradouro,
  cnpj,
  numero
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nomeFantasia,
    site,
    telefone,
    email,
    senha,
    cep,
    estado,
    cidade,
    bairro,
    logradouro,
    cnpj,
    numero
  );
  console.log('O SITE: ' + site);
  var instrucao = `
INSERT INTO hospital (nome_fantasia, cnpj, email, senha, site, logradouro, numero, cidade, estado, bairro, telefone, cep)
VALUES ('${nomeFantasia}', '${cnpj}', '${email}', '${senha}', '${site}', '${logradouro}', '${numero}', '${cidade}', '${estado}', '${bairro}', '${telefone}', '${cep}');
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function alterarSenha(senha, email) {
  var instrucao = `
        UPDATE hospital SET senha = '${senha}' WHERE email = '${email}';
    `;

  console.log('Executando a instrucao SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function deletar(email) {
  var query = `
        DELETE FROM hospital WHERE email = '${email}'
    `;

  console.log('Executando a instrucao SQL: \n' + query);
  return database.executar(query);
}

function validarHospital(email) {
  const query = `
    SELECT * FROM hospital WHERE email = '${email}'
  `;

  return database.executar(query);
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  alterarSenha,
  deletar,
  validarHospital,
};
