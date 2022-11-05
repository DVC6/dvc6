import isHigherAge from './validate-inputs/age-validator.js';
import isCPF from './validate-inputs/cpf-validator.js';
import dateValid from './validate-inputs/dtCheckin-validator.js';
import validRG from './validate-inputs/rg-validator.js';
import isEmail from './validate-inputs/email-validator.js';
import { tiposDeErro, messages } from './validate-inputs/config-errors.js';

const formInputs = document.querySelectorAll('[required]');
formInputs.forEach((input) => {
  input.addEventListener('blur', () => verifyInputs(input));
  input.addEventListener('invalid', (event) => event.preventDefault());
});

export default function verifyInputs(input) {
  let message = '';
  input.setCustomValidity('');

  if (input.name == 'email') {
    isEmail(input.value);
    console.log('email:', input.value);
  }

  if (input.name == 'nascimento') {
    console.log('Data Nascimento:', input.value);
    isHigherAge(input);
  }

  if (input.name == 'cpf' && input.value.length >= 11) {
    console.log('CPF:', input.value);
    isCPF(input);
  }

  if (input.name == 'dataCheckin') {
    console.log('Data consulta:', input.value);
    dateValid(input);
  }

  if (input.name == 'rg' && input.value.length >= 9) {
    console.log('RG:', input.value);
    validRG(input.value);
  }

  tiposDeErro.forEach((erro) => {
    if (input.validity[erro]) {
      message = messages[input.name][erro];
    }
  });

  const messageError = input.parentNode.querySelector('.error');
  const inputValidator = input.checkValidity();

  if (!inputValidator) {
    messageError.innerHTML = `<i class="fas fa-exclamation span_error"></i>
    <span class="span_error">${message}</span>`;
  } else {
    messageError.textContent = '';
  }
}
