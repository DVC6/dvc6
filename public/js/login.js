const $inputEmail = document.querySelector('.inputEmail');
const $inputSenha = document.querySelector('.inputSenha');
const $loginSubmit = document.querySelector('.loginSubmit');

const URL = 'http://localhost:3334';

function login() {
  const email = $inputEmail.value;
  const senha = $inputSenha.value;

  if (email === '' || senha === '') {
    if (email === '') {
      $inputEmail.classList.add('inputError');
    } else {
      $inputEmail.classList.remove('inputError');
    }

    if (senha === '') {
      $inputSenha.classList.add('inputError');
    } else if (senha.length < 8) {
      $inputSenha.classList.add('inputError');
    } else {
      $inputSenha.classList.remove('inputError');
    }
    return;
  }

  if (!email.includes('@')) {
    alert('Email inválido');

    if (email === '') {
      $inputEmail.classList.add('inputError');
      $inputEmail.previousElementSibling.classList.add('labelError');
    } else {
      $inputEmail.classList.remove('inputError');
      $inputEmail.previousElementSibling.classList.remove('labelError');
    }
    return;
  }

  if (senha.length < 8) {
    alert('Senha deve ter no mínimo 8 caracteres');

    if (senha === '') {
      $inputSenha.classList.add('inputError');
      $inputSenha.previousElementSibling.classList.add('labelError');
    } else {
      $inputSenha.classList.remove('inputError');
      $inputSenha.previousElementSibling.classList.remove('labelError');
    }

    return;
  }

  console.log("passei nas validacoes")
  console.log(email + "\t" + senha)
  fetch(`${URL}/hospitais/autenticar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        senha,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("entrei no then")
        if (data.error) {
          alert(data.error);
          return;
        }
        window.location.href = 'http://localhost:3334/pages/dashboardAdm.html';
      })
      .catch((err) => {
        console.log(err);
      });
}


function validarSessao() {
  const nomeFantasia = sessionStorage.LOGIN_HOSPITAL;

  if (nomeFantasia != null) {
    nomeUsuario.innerHTML = (`${nomeFantasia}`);
  } else {
    window.location = '../pages/login.html';
  }
}

$loginSubmit.addEventListener('click', login);

function deslogar() {
  delete sessionStorage.LOGIN_HOSPITAL;
}