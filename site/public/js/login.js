const $inputEmail = document.querySelector('.inputEmail');
const $inputSenha = document.querySelector('.inputSenha');
const $loginSubmit = document.querySelector('.loginSubmit');

const URL = 'http://localhost:3334';

async function login() {
  const email = $inputEmail.value;
  const senha = $inputSenha.value;

  if (email === '' || senha === '') {
    alert('Preencha todos os campos');
    return;
  }

  if (!email.includes('@')) {
    alert('Email inválido');
    return;
  }

  if (senha.length < 8) {
    alert('Senha deve ter no mínimo 8 caracteres');
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
        window.location.href = '/';
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
