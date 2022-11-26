export default function isHigherAge(input) {
  const dtNascimento = new Date(input.value);

  ageValidated(dtNascimento);

  if (!ageValidated(dtNascimento)) {
    console.log('Menor de idade');
    input.setCustomValidity('Você precisa ter mais de 18 anos.');
  } else {
    console.log('Maior de idade');
    input.setCustomValidity('');
  }
}

function ageValidated(data) {
  const dataAtual = new Date();
  const idade = dataAtual.getFullYear() - data.getFullYear();

  if (idade >= 18) {
    return true;
  } else {
    return false;
  }
}
