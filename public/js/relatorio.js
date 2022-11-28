function esconderModal() {
  const novoRelatorio = document.getElementById("novoRelatorio");
  novoRelatorio.style.display = "none";
}

function abrirModal() {
  const novoRelatorio = document.getElementById("novoRelatorio");
  const btnSimples = document.getElementById("btnSimples");
  const btnComposto = document.getElementById("btnComposto");
  btnSimples.style.display = "block";
  btnComposto.style.display = "none";
  novoRelatorio.style.display = "block";
}

function periodoSimples(idTotem) {
  debugger;
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadusuario"))
  );

  var dado = formulario.get("data");
  var ordenar = dado.split("-");
  var dia = `${ordenar[2]}`;
  var mes = `${ordenar[1]}`;
  var ano = `${ordenar[0]}`;
  idTotem = sessionStorage.ID_TOTEM;

  if (dia == "" || mes == "" || ano == "") {
    window.alert("Preencha todos os campos para prosseguir!");
    return false;
  }
  if (dia.length < 2) {
    console.log("dia está errado");
    return false;
  }
  if (mes.length < 2) {
    console.log("mes está errado");
    return false;
  }
  if (ano.length < 4) {
    console.log("ano está errado");
    return false;
  }

  fetch(`/relatorio/periodoSimples/${idTotem}`, {
    method: "POST",
    body: formulario,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);
      debugger;
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("lista_dados");
          var mensagem = document.createElement("span");
          feed.innerHTML = "";
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          if (resposta == 0) {
            var feed = document.getElementById("lista_dados");
            var mensagem = document.createElement("span");
            feed.innerHTML = "";
            mensagem.innerHTML = "Nenhum resultado encontrado.";
            feed.appendChild(mensagem);
            throw "Nenhum resultado encontrado!!";
          }
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          debugger;
          lista_dados.innerHTML = "";
          for (var i = 0; i < resposta.length; i++) {
            var dados = resposta[i];
            
            var ramvar = ""
            var cpuvar = ""
            var discovar = ""

            if(dados.ram != null) {
              var ramvar = dados.ram
            }
            if(dados.cpu != null) {
              var cpuvar = dados.cpu
            }
            if(dados.disco != null) {
              var discovar = dados.disco
            }


            lista_dados.innerHTML += `
            <tr>
                <td>${dados.nome_maquina}</td>
                <td>${dados.localizacao}</td>
                <td>${dados.dia}</td>
                <td>${dados.hora}</td>
                <td>${ramvar}</td>
                <td>${cpuvar}</td>
                <td>${discovar}</td>
            </tr>
                `;
          }
        });
      } else {
        throw "Houve um erro ao tentar gerar o relatório!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
