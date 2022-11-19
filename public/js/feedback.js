const btnSubmit = document.querySelector(".btnFeedback");

var starvalue = null;
var texto = null;

function atribuirNota(nota) {
  starvalue = nota;
}
const URL = "http://localhost:3334";

async function enviar() {
  texto = input_texto.value;
  var idFuncionario = sessionStorage.ID_FUNCIONARIO;

  const data = {
    starvalue,
    texto,
    idFuncionario,
  };

  console.table(data);

  if (starvalue != null && texto != null) {
    try {
      const response = await fetch(`${URL}/feedback/enviar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if ((response.status = 200)) {
        console.log("Mensagem enviada com sucesso!");
        return;
      }

      if ((response.status = 500)) {
        console.log("Houve um erro ao realizar o envio do feedback", response);
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return;
      }
    }
  }
}

btnSubmit.addEventListener("click", enviar);
