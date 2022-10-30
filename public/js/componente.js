function atualizarComponentes(idTotem) {
  var idTotem = sessionStorage.ID_TOTEM;
  fetch(`/dashboard/listarComponentes/${idTotem}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("listar_componentes");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          for (var i = 0; i < resposta.length; i++) {
            var componente = resposta[i];

            listar_componentes.innerHTML += `
                      <tr>
                          <td>${componente.tipo}</td>
                          <td>${componente.nome}</td>
                          <td>${componente.medida_componente}</td>
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
