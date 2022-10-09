const $inputEmail = document.querySelector('.inputEmail');
const $inputSenha = document.querySelector('.inputSenha');
const btnSubmit = document.querySelector('.loginSubmit');

const URL = 'http://localhost:3334';

function login() {
  const email = $inputEmail.value;
  const senha = $inputSenha.value;

  const req = fetch(`${URL}/hospitais/autenticar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  const response = req.then((response) => response.json()).catch((err) => err);

  response.then((val) => console.log(val)).catch((err) => console.log(err));
}
