const $inputEmail = document.querySelector('.inputEmail');
const $inputSenha = document.querySelector('.inputSenha');
const $loginSubmit = document.querySelector('.loginSubmit');

const URL = 'http://localhost:3334';

async function login() {
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

  try {
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

    if (response.ok) {
      console.log(
        response.json().then((json) => {
          sessionStorage.LOGIN_HOSPITAL = json.nomeFantasia;
          sessionStorage.ID_HOSPITAL = json.idHospital;
        })
      );
      setInterval(() => {
        window.location.href = "dashboardAdm.html";
      }, 2000);
    }

    if (response.status === 403) {
      console.log('Usuario nao existe ou ja cadastrado!');
      return;
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return;
    }
  }
}

function validarSessao() {
  const nomeFantasia = sessionStorage.LOGIN_HOSPITAL;

  if (nomeFantasia != null) {
  } else {
    window.location = '../pages/login.html';
  }
}

$loginSubmit.addEventListener('click', login);

function deslogar() {
  delete sessionStorage.LOGIN_HOSPITAL;
}