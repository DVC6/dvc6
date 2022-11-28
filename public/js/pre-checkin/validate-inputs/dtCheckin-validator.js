export default function dateValid(input) {
  const dtCheckin = new Date(input.value);

  validateDate(dtCheckin);

  if (!validateDate(dtCheckin)) {
    input.setCustomValidity(
      'A data do check-in deve ser maior que a data atual.'
    );
  }
}

function validateDate(dtCheckin) {
  const dataAtual = new Date();

  if (dtCheckin > dataAtual) {
    return true;
  } else {
    return false;
  }
}
