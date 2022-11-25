function pegarDadosUsuarioGeral() {
  if (sessionStorage.LOGIN_HOSPITAL != null) {
    pegarDadosUsuarioGerente();
  } else {
    pegarDadosUsuario();
  }
}

function pegarDadosUsuarioGerente(idUsuario) {
  var idUsuario = sessionStorage.ID_HOSPITAL;
  fetch(`/usuarios/pegarDadosUsuarioGerente/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado.");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          for (var i = 0; i < resposta.length; i++) {
            var dados = resposta[i];

            var nome = dados.nome_fantasia.split(" ");
            if (nome.length > 1) {
              var sobrenome = nome[1].split("");
              nomeUsuario3.innerHTML = `${nome[0]}.${sobrenome[0]}`;
              nomeUsuario4.innerHTML = `${nome[0]}.${sobrenome[0]}`;
            } else {
              nomeUsuario3.innerHTML = `${dados.nome_fantasia}`;
              nomeUsuario4.innerHTML = `${dados.nome_fantasia}`;
            }
            nomeUsuario5.innerHTML = `${dados.nome_fantasia}`;
            emailUsuario.innerHTML = `${dados.email}`;
            cargoUsuario.innerHTML = "Gerente";
            cargoUsuario2.innerHTML = "Gerente";
            cargoUsuario3.innerHTML = "Gerente";
          }
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function pegarDadosUsuario(idUsuario) {
  var idUsuario = sessionStorage.ID_FUNCIONARIO;
  fetch(`/usuarios/pegarDadosUsuario/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado.");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          for (var i = 0; i < resposta.length; i++) {
            var dados = resposta[i];

            var nome = dados.nome_funcionario.split(" ");
            if (nome.length > 1) {
              var sobrenome = nome[1].split("");
              nomeUsuario3.innerHTML = `${nome[0]}.${sobrenome[0]}`;
              nomeUsuario4.innerHTML = `${nome[0]}.${sobrenome[0]}`;
            } else {
              nomeUsuario3.innerHTML = `${dados.nome_funcionario}`;
              nomeUsuario4.innerHTML = `${dados.nome_funcionario}`;
            }
            nomeUsuario5.innerHTML = `${dados.nome_funcionario}`;
            emailUsuario.innerHTML = `${dados.email}`;
            cargoUsuario.innerHTML = `${dados.cargo}`;
            cargoUsuario2.innerHTML = `${dados.cargo}`;
            cargoUsuario3.innerHTML = `${dados.cargo}`;
          }
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function esconderModal() {
  const editUser = document.getElementById("editUser");
  editUser.style.display = "none";
}

function abrirCadastro() {
  const editUser = document.getElementById("editUser");
  const btnEdit = document.getElementById("btnEdit");
  const btnEdit2 = document.getElementById("btnEdit2");
  const labelSenha = document.getElementById("labelSenha");
  const input_senha = document.getElementById("input_senha");
  btnEdit2.style.display = "none";
  labelSenha.style.display = "none";
  input_senha.style.display = "none";
  labelNome.style.display = "block";
  input_nome.style.display = "block";
  labelFunc.style.display = "block";
  input_funcao.style.display = "block";
  labelEmail.style.display = "block";
  input_email.style.display = "block";
  btnEdit.style.display = "block";
  editUser.style.display = "block";

  if (sessionStorage.LOGIN_HOSPITAL != null) {
    labelFunc.style.display = "none";
    input_funcao.style.display = "none";
  }
}

function editUsuarioGeral() {
  if (sessionStorage.LOGIN_HOSPITAL != null) {
    editarUsuarioGerente();
  } else {
    editarUsuario();
  }
}

function editarUsuarioGerente(nome, email, idFuncionario) {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var nome = formulario.get("nome");
  var email = formulario.get("email");
  var idFuncionario = sessionStorage.ID_HOSPITAL;

  if (nome == "" || email == "") {
    window.alert("Preencha todos os campos para prosseguir!");
    if (nome == "") {
      console.log("nome está em branco");
    }
    if (email == "") {
      console.log("email está em branco");
    }
    return false;
  }

  if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
    window.alert("Ops, e-mail inválido! Verifique e tente novamente.");
    return false;
  }

  fetch(`/usuarios/editarUsuarioGerente/${idFuncionario}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Usuario editado com sucesso!");
        if (sessionStorage.LOGIN_HOSPITAL != null) {
          sessionStorage.LOGIN_HOSPITAL = nome;
          location.reload();
          limparFormulario();
        } else {
          sessionStorage.LOGIN_FUNCIONARIO = nome;
          location.reload();
          limparFormulario();
        }
      } else {
        throw "Houve um erro ao tentar realizar a edição do usuario!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function editarUsuario(nome, email, cargo, idFuncionario) {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var nome = formulario.get("nome");
  var email = formulario.get("email");
  var cargo = formulario.get("cargo");
  var idFuncionario = sessionStorage.ID_FUNCIONARIO;

  if (nome == "" || cargo == "" || email == "") {
    window.alert("Preencha todos os campos para prosseguir!");
    if (nome == "") {
      console.log("nome está em branco");
    }
    if (cargo == "") {
      console.log("cargo está em branco");
    }
    if (email == "") {
      console.log("email está em branco");
    }
    return false;
  }

  if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
    window.alert("Ops, e-mail inválido! Verifique e tente novamente.");
    return false;
  }

  fetch(`/usuarios/editarUsuario/${idFuncionario}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Usuario editado com sucesso!");
        if (sessionStorage.LOGIN_HOSPITAL != null) {
          sessionStorage.LOGIN_HOSPITAL = nome;
          location.reload();
          limparFormulario();
        } else {
          sessionStorage.LOGIN_FUNCIONARIO = nome;
          location.reload();
          limparFormulario();
        }
      } else {
        throw "Houve um erro ao tentar realizar a edição do usuario!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function alterarSenhaModal() {
  const labelNome = document.getElementById("labelNome");
  const input_nome = document.getElementById("input_nome");
  const labelEmail = document.getElementById("labelEmail");
  const input_email = document.getElementById("input_email");
  const editUser = document.getElementById("editUser");
  const btnEdit = document.getElementById("btnEdit");
  const labelFunc = document.getElementById("labelFunc");
  const input_funcao = document.getElementById("input_funcao");
  labelNome.style.display = "none";
  input_nome.style.display = "none";
  labelEmail.style.display = "none";
  input_email.style.display = "none";
  labelFunc.style.display = "none";
  input_funcao.style.display = "none";
  btnEdit.style.display = "none";
  labelSenha.style.display = "block";
  input_senha.style.display = "block";
  btnEdit2.style.display = "block";
  editUser.style.display = "block";
}

function alterarSenhaGeral() {
  if (sessionStorage.LOGIN_HOSPITAL != null) {
    alterarSenhaGerente();
  } else {
    alterarSenha();
  }
}

function alterarSenhaGerente(senha, idFuncionario) {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var senha = formulario.get("senha");
  var idFuncionario = sessionStorage.ID_HOSPITAL;

  if (senha == "" || senha.length < 8) {
    window.alert("Ops, senha inválida! Verifique e tente novamente.");
    return false;
  }

  fetch(`/usuarios/alterarSenhaGerente/${idFuncionario}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Senha alterada com sucesso!");
        location.reload();
        limparFormulario();
      } else {
        throw "Houve um erro ao tentar realizar a alteração da Senha!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function alterarSenha(senha, idFuncionario) {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var senha = formulario.get("senha");
  var idFuncionario = sessionStorage.ID_FUNCIONARIO;

  if (senha == "" || senha.length < 8) {
    window.alert("Ops, senha inválida! Verifique e tente novamente.");
    return false;
  }

  fetch(`/usuarios/alterarSenha/${idFuncionario}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Senha alterada com sucesso!");
        location.reload();
        limparFormulario();
      } else {
        throw "Houve um erro ao tentar realizar a alteração da Senha!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
