export default function isCPF(input) {
  const cpf = input.value.replace(/\.|-/g, '');

  validateNumbersRepeated(cpf);
  validateFirstDigitCPF(cpf);
  validateSecondDigit(cpf);

  if (
    validateFirstDigitCPF(cpf) ||
    validateSecondDigit(cpf) ||
    validateNumbersRepeated(cpf)
  ) {
    input.setCustomValidity('Esse CPF é inválido.');
  }
}

function validateNumbersRepeated(cpf) {
  const numbersRepeated = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  return numbersRepeated.includes(cpf);
}

function validateFirstDigitCPF(cpf) {
  let soma = 0;
  let multiplicador = 10;

  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpf[9];
}

function validateSecondDigit(cpf) {
  let soma = 0;
  let multiplicador = 11;

  for (let tamanho = 0; tamanho < 10; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpf[10];
}
