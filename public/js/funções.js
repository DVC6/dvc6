function validarSessao() {
  debugger;
  const nomeFantasia = sessionStorage.LOGIN_HOSPITAL;
  const nomeFuncionario = sessionStorage.LOGIN_FUNCIONARIO;

  if (nomeFantasia != null) {
    nomeUsuario.innerHTML = `${nomeFantasia}`;
  } else if (nomeFuncionario != null) {
    funcionariosInfo.style.display = "none";
    nomeUsuario.innerHTML = `${nomeFuncionario}`;
  } else {
    window.location = "../pages/login.html";
  }
}

function deslogar() {
  delete sessionStorage.LOGIN_HOSPITAL;
  delete sessionStorage.ID_HOSPITAL;
  window.location = "../pages/login.html";
}
