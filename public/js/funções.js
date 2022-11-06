function validarSessao() {
  const nomeFantasia = sessionStorage.LOGIN_HOSPITAL;
  const nomeFuncionario = sessionStorage.LOGIN_FUNCIONARIO;

  debugger;
  if (nomeFantasia != null) {
    var nome = nomeFantasia.split(" ");
    nomeUsuario.innerHTML = `${nome[0]}`;
    nomeUsuario2.innerHTML = `${nome[0]}`;
  } else if (nomeFuncionario != null) {
    var nome = nomeFuncionario.split(" ");
    sideFuncionario.style.display = "none";
    nomeUsuario.innerHTML = `${nome[0]}`;
    nomeUsuario2.innerHTML = `${nome[0]}`;
  } else {
    window.location = "../pages/login.html";
  }
}

function deslogar() {
  delete sessionStorage.LOGIN_HOSPITAL;
  delete sessionStorage.ID_HOSPITAL;
  delete sessionStorage.LOGIN_FUNCIONARIO;
  delete sessionStorage.ID_FUNCIONARIO;
  delete sessionStorage.FK_HOSPITAL;
  delete sessionStorage.ID_TOTEM;
  delete sessionStorage.NOME_TOTEM;
  window.location = "../pages/login.html";
}

function menuToggle() {
  const toggleMenu = document.querySelector(".menu");
  toggleMenu.classList.toggle("active");
}
