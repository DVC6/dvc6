const date = new Date();
var dataAtual = date.getDate();
var contadorTotens = 0;
var contadorAcimaRAM = 0;
var contadorAcimaCPU = 0;

function atualizarTotens(idHospital) {
  
  const nomeFantasia = sessionStorage.LOGIN_HOSPITAL;
  const nomeFuncionario = sessionStorage.LOGIN_FUNCIONARIO;
  var idHospital = sessionStorage.ID_HOSPITAL;
  fetch(`/dashboard/listarTotens/${idHospital}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("lista_totens");
          var mensagem = document.createElement("span");
          feed.innerHTML = "";
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          lista_totens.innerHTML = "";
          for (var i = 0; i < resposta.length; i++) {
            var totens = resposta[i];

            if (totens.consumo <= 69) {
              var img = "../img/kioskright.png";
            } else if (totens.consumo <= 89) {
              var img = "../img/kiosk.png";
            } else {
              var img = "../img/kioskperigo.png";
            }

            if (nomeFantasia != null) {
              lista_totens.innerHTML += `
              <tr>
                  <td><img style="display: flex;" src=${img}></td>
                  <td>${totens.nome_maquina}</td>
                  <td>${totens.localizacao}</td>
                  <td class="acao"><button onclick="analyticsPage(${totens.id_totem})"><i class='fas fa-chart-area' ></i></button></td>
                  <td id="editartdTotem" class="acao"><button onclick="editTotem(${totens.id_totem})"><i class="bx bx-edit"></i></button></td>
                  <td id="excluirtdTotem" class="acao"><button onclick="pegarDados(${totens.id_totem})"><i class='bx bx-trash'></i></button></td>
              </tr>
                  `;
            } else if (nomeFuncionario != null) {
              editarthTotem.style.display = "none";
              excluirthTotem.style.display = "none";
              lista_totens.innerHTML += `
              <tr>
                  <td><img style="display: flex;" src=${img}></td>
                  <td>${totens.nome_maquina}</td>
                  <td>${totens.localizacao}</td>
                  <td class="acao"><button onclick="analyticsPage(${totens.id_totem})"><i class='fas fa-chart-area' ></i></button></td>
              </tr>
                  `;
            }

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

function analyticsPage(idTotem) {
  sessionStorage.ID_TOTEM = idTotem;
  fetch(`/dashboard/listarTotens/${sessionStorage.ID_HOSPITAL}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          for (var i = 0; i < resposta.length; i++) {
            var totens = resposta[i];
            if (totens.id_totem == idTotem) {
              var nome = totens.nome_maquina;
            }
            sessionStorage.NOME_TOTEM = nome;
          }
          window.location.href = "dashboardHardwares2.html";
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function pegarDados(idTotem) {
  fetch(`/dashboard/pegarDados/${idTotem}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          for (var i = 0; i < resposta.length; i++) {
            var dados = resposta[i];
            sessionStorage.FK_COMPONENTE = dados.fkcomponente;
            deletarfkComponente();
          }
          deletarTotem(idTotem);
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function deletarfkComponente() {
  var fkComponente = sessionStorage.FK_COMPONENTE;
  fetch(`/dashboard/deletarfkComponente/${fkComponente}`, {
    method: "POST",
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log("Componente deletado com sucesso!");
        // location.reload();
      } else {
        throw "Houve um erro ao tentar deletar este componente!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function deletarTotem(idTotem) {
  fetch(`/dashboard/deletarTotem/${idTotem}`, {
    method: "POST",
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Totem deletado com sucesso!");
        location.reload();
      } else {
        throw "Houve um erro ao tentar deletar este totem!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

var idTotemEdit;
function editTotem(idTotem) {
  const btnsalvar = document.getElementById("btnSalvar");
  const btnEdit = document.getElementById("btnEdit");
  const novoUsuario = document.getElementById("novoUsuario");
  btnsalvar.style.display = "none";
  btnEdit.style.display = "block";
  novoUsuario.style.display = "block";
  idTotemEdit = idTotem;
}

function editarTotem(nome, localizacao, idTotem) {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var nome = formulario.get("nome");
  var localizacao = formulario.get("localizacao");
  idTotem = idTotemEdit;

  if (nome == "" || localizacao == "") {
    window.alert("Preencha todos os campos para prosseguir!");
  } else {
    fetch(`/dashboard/editarTotem/${idTotem}`, {
      method: "POST",
      body: formulario,
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          window.alert("Totem editado com sucesso!");
          location.reload();
          limparFormulario();
        } else {
          throw "Houve um erro ao tentar realizar a edi????o do totem!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

function carregarDashboard() {
  var dadoTotem = this.id.split(",");
  var idTotem = dadoTotem[0];
  var nome_maquina = dadoTotem[1];
  sessionStorage.ID_TOTEM = idTotem;
  sessionStorage.NOME_TOTEM = nome_maquina;
  window.location = "./DashboardTotem.html";
}

async function verificarTotensEmRisco(idTotem) {
  var ultimosDados = await fetch(`/dashboard/buscarTotensEmRisco/${idTotem}`);
  if (ultimosDados.status === 200) {
    ultimosDados = await ultimosDados.json();
    var ultimoDadoCPU = ultimosDados.percentualCPU;
    var ultimoDadoRAM = ultimosDados.percentualRAM;

    if (ultimoDadoRAM >= 80) {
      contadorAcimaRAM++;
      porcentagemServidoresRAM = (contadorAcimaRAM * 100) / contadorTotens;
      document.getElementById("spanRAM").innerHTML =
        porcentagemServidoresRAM.toFixed(2) + "%";
    }

    if (ultimoDadoRAM >= 90 || ultimoDadoCPU >= 90) {
      document.getElementById(`divTotem${idServidor}`).style.background =
        "#ec3434";
    } else if (ultimoDadoRAM >= 70 || ultimoDadoCPU >= 70) {
      document.getElementById(`divTotem${idServidor}`).style.background =
        "#dfdf00";
    }

    if (ultimoDadoCPU >= 80) {
      contadorAcimaCPU++;
      porcentagemServidoresCPU = (contadorAcimaCPU * 100) / contadorTotens;
      document.getElementById("spanCPU").innerHTML =
        porcentagemServidoresCPU.toFixed(2) + "%";
    }
  }
}

async function pegarUltimaData(idTotem) {
  var ultimaData = await fetch(`/dashboard/buscarUltimaData/${idTotem}`);
  if (ultimaData.status === 200) {
    ultimaData = await ultimaData.json();
    var dataColetada = ultimaData[0].dia;
    return dataColetada;
  }
  return 0;
}

function esconderModal() {
  const novoUsuario = document.getElementById("novoUsuario");
  novoUsuario.style.display = "none";
}

function abrirCadastro() {
  const novoUsuario = document.getElementById("novoUsuario");
  const btnsalvar = document.getElementById("btnSalvar");
  const btnEdit = document.getElementById("btnEdit");
  btnsalvar.style.display = "block";
  btnEdit.style.display = "none";
  novoUsuario.style.display = "block";
}

function atualizarFuncionarios(idHospital) {
  var idHospital = sessionStorage.ID_HOSPITAL;
  fetch(`/dashboard/listarFuncionarios/${idHospital}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("lista_funcionarios");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          for (var i = 0; i < resposta.length; i++) {
            var funcionario = resposta[i];

            lista_funcionarios.innerHTML += `
                    <tr>
                        <td>${funcionario.nome_funcionario}</td>
                        <td>${funcionario.cargo}</td>
                        <td>${funcionario.email}</td>
                        <td class="acao"><button onclick="editUsuario(${funcionario.id_funcionario})"><i class='bx bx-edit' ></i></button></td>
                        <td class="acao"><button onclick="deletarUsuario(${funcionario.id_funcionario})"><i class='bx bx-trash'></i></button></td>
                    </tr>
                        `;
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

function qtdFuncionarios(idHospital) {
  var idHospital = sessionStorage.ID_HOSPITAL;
  fetch(`/dashboard/qtdFuncionarios/${idHospital}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          alert("erro na fun????o qtdFuncionario");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          for (let i = 0; i < resposta.length; i++) {
            var query = resposta[i];

            // trazer id da box html
            qtd_funcionarios.innerHTML = `
                      <span>${query.qtdfuncionairos}</span>
                `;
          }
        });
      } else {
        throw "Houve um erro na fun????o qtdFuncionarios!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function qtdTotem(idHospital) {
  var idHospital = sessionStorage.ID_HOSPITAL;
  fetch(`/dashboard/qtdTotem/${idHospital}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          alert("erro na fun????o qtdTotem");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          for (let i = 0; i < resposta.length; i++) {
            var query = resposta[i];

            // trazer id da box html
            qtd_totens.innerHTML = `
                      <span>${query.qtdtotem}</span>
                `;
          }
        });
      } else {
        throw "Houve um erro na fun????o qtdTotem!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

var idFuncionarioEdit;
function editUsuario(idFuncionario) {
  const btnsalvar = document.getElementById("btnSalvar");
  const btnEdit = document.getElementById("btnEdit");
  const novoUsuario = document.getElementById("novoUsuario");
  btnsalvar.style.display = "none";
  btnEdit.style.display = "block";
  novoUsuario.style.display = "block";
  idFuncionarioEdit = idFuncionario;
}

function deletarUsuario(idFuncionario) {
  fetch(`/dashboard/deletarUsuario/${idFuncionario}`, {
    method: "POST",
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Usu??rio deletado com sucesso!");
        location.reload();
      } else {
        throw "Houve um erro ao tentar deletar este usu??rio!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function editarUsuario(nome, senha, email, cargo, idFuncionario) {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var nome = formulario.get("nome");
  var senha = formulario.get("senha");
  var email = formulario.get("email");
  var cargo = formulario.get("cargo");
  idFuncionario = idFuncionarioEdit;

  if (nome == "" || cargo == "" || senha == "" || email == "") {
    window.alert("Preencha todos os campos para prosseguir!");
    if (nome == "") {
      console.log("nome est?? em branco");
    }
    if (cargo == "") {
      console.log("cargo est?? em branco");
    }
    if (email == "") {
      console.log("email est?? em branco");
    }
    if (senha == "") {
      console.log("senha est?? em branco");
    }
    return false;
  }

  if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
    window.alert("Ops, e-mail inv??lido! Verifique e tente novamente.");
    return false;
  } else if (senha == "" || senha.length < 8) {
    window.alert("Ops, senha inv??lida! Verifique e tente novamente.");
    return false;
  }

  fetch(`/dashboard/editarUsuario/${idFuncionario}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Usuario editado com sucesso!");
        location.reload();
        limparFormulario();
      } else {
        throw "Houve um erro ao tentar realizar a edi????o do usuario!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function cadastrarUsuario() {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var nome = formulario.get("nome");
  var senha = formulario.get("senha");
  var email = formulario.get("email");
  var cargo = formulario.get("cargo");

  if (nome == "" || cargo == "" || senha == "" || email == "") {
    window.alert("Preencha todos os campos para prosseguir!");
    if (nome == "") {
      console.log("nome est?? em branco");
    }
    if (cargo == "") {
      console.log("cargo est?? em branco");
    }
    if (email == "") {
      console.log("email est?? em branco");
    }
    if (senha == "") {
      console.log("senha est?? em branco");
    }

    return false;
  }

  if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
    window.alert("Ops, e-mail inv??lido! Verifique e tente novamente.");

    return false;
  } else if (senha == "" || senha.length < 8) {
    window.alert("Ops, senha inv??lida! Verifique e tente novamente.");

    return false;
  }

  var idHospital = sessionStorage.ID_HOSPITAL;

  fetch(`/dashboard/cadastrarUsuario/${idHospital}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Cadastro realizado com sucesso!");
        location.reload();
        limparFormulario();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function totensCPUAcima90() {
  fetch(`/dashboard/totensCPUAcima90/${sessionStorage.ID_HOSPITAL}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var acima90 = 0;
          console.log(acima90);
          for (var i = 0; i < resposta.length; i++) {
            var dados = resposta[i];
            if (dados.consumo > 90) {
              acima90 ++;
            }
            idCPUacima90.innerHTML = acima90;
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

function totensRAMAcima90() {
  fetch(`/dashboard/totensRAMAcima90/${sessionStorage.ID_HOSPITAL}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var acima90 = 0;
          console.log(acima90);
          for (var i = 0; i < resposta.length; i++) {
            var dados = resposta[i];
            if (dados.consumo > 90) {
              acima90 ++;
            }
            idRAMacima90.innerHTML = acima90;
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

setInterval(() => {
  atualizarTotens();
  totensCPUAcima90();
  totensRAMAcima90();
}, 5000);
