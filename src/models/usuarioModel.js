var database = require('../database/config');

function listar(fkHospital) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT * from funcionario WHERE fk_hospital = ${fkHospital};
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function cadastrar(
  nome,
  senha,
  email,
  cargo,
  fkHospital
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    senha,
    email,
    cargo,
    fkHospital
  );
  console.log('O SITE: ' + site);
  var instrucao = `
INSERT INTO funcionario (nome, senha, email, cargo, fk_hospital)
VALUES ('${nome}', '${senha}', '${email}', '${cargo}', '${fkHospital}');
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function alterarSenha(senha, email) {
  var instrucao = `
        UPDATE funcionario SET senha = '${senha}' WHERE email = '${email}';
    `;

  console.log('Executando a instrucao SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function deletar(email) {
  var query = `
        DELETE FROM funcionario WHERE email = '${email}'
    `;

  console.log('Executando a instrucao SQL: \n' + query);
  return database.executar(query);
}

function validarFuncionario(email) {
  const query = `
    SELECT * FROM funcionario WHERE email = '${email}'
  `;

  return database.executar(query);
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  alterarSenha,
  deletar,
  validarFuncionario
};