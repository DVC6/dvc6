// CONTADOR SERVIDORES ATIVOS/////////
const date = new Date();
var dataAtual = date.getDate();
var contadorTotens = 0;
var contadorAcimaRAM = 0;
var contadorAcimaCPU = 0;

function atualizarTotens(idHospital) {
  var idHospital = sessionStorage.ID_HOSPITAL;
  fetch(`/dashboard/listarTotens/${idHospital}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("lista_totens");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var feed = document.getElementById("lista_totens");
          feed.innerHTML = "";

          // Gerando lista
          for (var i = 0; i < resposta.length; i++) {
            var totem = resposta[i];

            // criando e manipulando elementos do HTML
            var divTotem = document.createElement("div");
            var spanID = document.createElement("span");
            var spanTitulo = document.createElement("span");
            var divButtons = document.createElement("div");

            // spanID.innerHTML = totem.idTotem + "<br>";
            // spanTitulo.innerHTML = totem.nome_maquina + "<br>";
            divButtons.innerHTML = "Detalhes";

            // adicionando propriedades para CSS
            divTotem.className = "publicacao";
            divTotem.id = "divTotem" + totem.idTotem;
            spanTitulo.id = "inputNumero" + totem.idTotem;
            spanTitulo.className = "publicacao-titulo";

            divButtons.className = "div-buttons";
            divButtons.id = totem.idTotem + "," + totem.nome_maquina;

            divTotem.appendChild(spanID);
            divTotem.appendChild(spanTitulo);
            divTotem.appendChild(divButtons);
            feed.appendChild(divTotem);

            divButtons.addEventListener("click", carregarDashboard);

            verificarTotensEmRisco(totem.idTotem);
            // Acionar contador de totens logados
            var ultimaData;
            pegarUltimaData(totem.idTotem).then((resposta) => {
              ultimaData = resposta;
              if (ultimaData == dataAtual) {
                contadorTotens++;
                document.getElementById("totensAtivos").innerHTML =
                  contadorTotens;
              }
            });
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

function controleCadastro() {
  //     debugger;
  // const fade = document.getElementById("fade")
  // const listaUsuario = document.getElementById("cadastroUsuarios")
  var idHospital = sessionStorage.ID_HOSPITAL;
  atualizarFuncionarios(idHospital);

  // fade.style.display = "block";
  // listaUsuario.style.display = "block";
}

function esconderModal() {
  // const fade = document.getElementById("fade")
  // const listaUsuario = document.getElementById("cadastroUsuarios")
  const novoUsuario = document.getElementById("novoUsuario");

  // fade.style.display = "none";
  // listaUsuario.style.display = "none";
  novoUsuario.style.display = "none";
}

function abrirCadastro() {
  // const listaUsuario = document.getElementById("cadastroUsuarios")
  const novoUsuario = document.getElementById("novoUsuario");
  // listaUsuario.style.display = "none";
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

          // var feed = document.getElementById("lista_funcionarios");
          // feed.innerHTML = "";

          // Gerando lista Funcionários
          for (var i = 0; i < resposta.length; i++) {
            var funcionario = resposta[i];

            lista_funcionarios.innerHTML += `
                    <tr>
                        <td>${funcionario.nome_funcionario}</td>
                        <td>${funcionario.cargo}</td>
                        <td>${funcionario.email}</td>
                        <td class="acao"><button onclick="editItem(${funcionario.id_funcionario})"><i class='bx bx-edit' ></i></button></td>
                        <td class="acao"><button onclick="deletarUsuario(${funcionario.id_funcionario})"><i class='bx bx-trash'></i></button></td>
                    </tr>
                    `;

            // criando e manipulando elementos do HTML
            // var divFuncionario = document.createElement("td");
            // var spanID = document.createElement("td");
            // var spanTitulo = document.createElement("td");
            // var divButtons = document.createElement("td");

            // spanID.innerHTML = funcionario.id_funcionario;
            // spanTitulo.innerHTML = funcionario.nome_funcionario;
            // divButtons.innerHTML = "Deletar";

            // adicionando propriedades para CSS
            // divFuncionario.className = "publicacao";
            // divFuncionario.id = "divFuncionario" + funcionario.id_funcionario;
            // spanTitulo.id = "inputNumero" + funcionario.id_funcionario;
            // spanTitulo.className = "publicacao-titulo";

            // divButtons.className = "div-buttons";
            // divButtons.id = funcionario.id_funcionario + "," + funcionario.nome_funcionario;

            // divFuncionario.appendChild(spanID);
            // divFuncionario.appendChild(spanTitulo);
            // divFuncionario.appendChild(divButtons);
            // feed.appendChild(divFuncionario);

            // divButtons.addEventListener("click", deletarUsuario);
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

function deletarUsuario(idFuncionario) {
  debugger;
//   var dadoFuncionario = this.id.split(","); 
//   var idFuncionario = dadoFuncionario[0];
  fetch(`/dashboard/deletarUsuario/${idFuncionario}`)
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Usuário deletado com sucesso!");
        window.location = "dashboardAdm.html";
      } else {
        throw "Houve um erro ao tentar deletar este usuário!";
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
      console.log("nome está em branco");
    }
    if (usuario == "") {
      console.log("cargo está em branco");
    }
    if (senha == "") {
      console.log("senha está em branco");
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

  var idHospital = sessionStorage.ID_HOSPITAL;

  fetch(`/dashboard/cadastrarUsuario/${idHospital}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert("Cadastro realizado com sucesso!");
        window.location = "dashboardAdm.html";
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
