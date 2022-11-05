export const tiposDeErro = [
  'valueMissing',
  'patternMismatch',
  'tooShort',
  'typeMismatch',
  'customError',
];

export const messages = {
  nome: {
    valueMissing: 'O campo nome é obrigatório.',
    patternMismatch: 'O nome deve conter apenas letras.',
    tooShort: 'Preencha um nome válido.',
  },
  email: {
    valueMissing: 'O campo email é obrigatório.',
    typeMismatch: 'Preencha um email válido.',
    tooShort: 'Preencha um email válido.',
  },
  nascimento: {
    valueMissing: 'O campo data de nascimento é obrigatório.',
    typeMismatch: 'Preencha uma data válida.',
    tooShort: 'Preencha uma data válida.',
    customError: 'Você precisa ter mais de 18 anos.',
  },
  cpf: {
    valueMissing: 'O campo CPF é obrigatório.',
    patternMismatch: 'Preencha um CPF válido.',
    tooShort: 'O CPF deve conter 11 dígitos.',
    customError: 'Esse CPF é inválido.',
  },
  dataCheckin: {
    valueMissing: 'O campo data da consulta é obrigatório.',
    typeMismatch: 'Preencha uma data válida.',
    tooShort: 'Preencha uma data válida.',
    customError: 'A data do check-in deve ser maior que a data atual.',
  },
  rg: {
    valueMissing: 'O campo RG é obrigatório.',
    patternMismatch: 'Preencha um RG válido.',
    tooShort: 'O RG deve conter 9 dígitos.',
  },
};
