function validarSessao() {
  const nomeFantasia = sessionStorage.LOGIN_HOSPITAL;

  if (nomeFantasia != null) {
    nomeUsuario.innerHTML = (`${nomeFantasia}`);
  } else {
    window.location = '../pages/login.html';
  }
}

function deslogar() {
  delete sessionStorage.LOGIN_HOSPITAL;
  delete sessionStorage.ID_HOSPITAL;
  window.location = '../pages/login.html';
}