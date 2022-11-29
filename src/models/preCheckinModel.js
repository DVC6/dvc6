var database = require('../database/config');


function relizarPreCheckin(
  nome,
  email,
  cpf,
  dataCheckin,
  idade,
  optionTipoConsulta,
  fkHospital,
  optionNomeHospital
) {
  var instrucao = `INSERT INTO dbo.pre_check_in (nome, cpf, idade, email, data_cadastro, fkhospital, [motivo], nome_hospital) VALUES ('${nome}', '${cpf}', '${idade}', '${email}', '${dataCheckin}', ${fkHospital}, '${optionTipoConsulta}', '${optionNomeHospital}');`;

  return database.executar(instrucao);
}

module.exports = { relizarPreCheckin };
