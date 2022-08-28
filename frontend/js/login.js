const $inputEmail = document.querySelector('.inputEmail');
const $inputSenha = document.querySelector('.inputSenha');
const $loginSubmit = document.querySelector('.loginSubmit');

const URL = 'http://localhost:3334';

async function login() {
  const email = $inputEmail.value;
  const senha = $inputSenha.value;

  const response = await fetch(`${URL}/hospitais/autenticar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });
}

$loginSubmit.addEventListener('click', () => console.log("foi"););
