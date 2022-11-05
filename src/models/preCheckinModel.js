var database = require('../database/config');

function relizarPreCheckin(
  nome,
  email,
  rg,
  cpf,
  dataCheckin,
  idade,
  optionTipoConsulta,
  fkHospital
) {
  var instrucao = `INSERT INTO dbo.pre_check_in (nome, cpf, rg, idade, email, data_cadastro, fkhospital, [motivo]) VALUES ('${nome}', '${cpf}', '${rg}', '${idade}', '${email}', '${dataCheckin}', ${fkHospital}, '${optionTipoConsulta}');`;

  return database.executar(instrucao);
}

module.exports = { relizarPreCheckin };
