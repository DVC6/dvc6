let inptNome = document.querySelector('.input_nome');
let inptEmail = document.querySelector('.input_email');
let inptRg = document.querySelector('.input_rg');
let inptCpf = document.querySelector('.input_cpf');
let btnSubmit = document.querySelector('.btn_finalizar');
let btnCancel = document.querySelector('.btn_cancelar');
let caixa = document.querySelector('.caixa');
let inputDtCheckin = document.querySelector('.input_data_consulta');
let inputDtNascimento = document.querySelector('.input_data_nascimento');
let selectMotivoPrecheckin = document.getElementById(
  'select_motivo_precheckin'
);

var optionTipoConsulta;

selectMotivoPrecheckin.addEventListener('change', function () {
  optionTipoConsulta = selectMotivoPrecheckin.value;
});

async function sendCheckin() {
  const nome = inptNome.value;
  const email = inptEmail.value;
  const rg = inptRg.value;
  const cpf = inptCpf.value;
  const dataCheckin = inputDtCheckin.value;
  const dataAtual = new Date();
  const dataNascimento = new Date(inputDtNascimento.value);

  const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

  sessionStorage.setItem('ID_HOSPITAL', 1);
  const fkHospital = Number(sessionStorage.getItem('ID_HOSPITAL'));
  const data = {
    nome,
    email,
    rg,
    cpf,
    dataCheckin,
    idade,
    optionTipoConsulta,
    fkHospital,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch('/pre-checkin/realizar-pre-checkin', options);

  if (response.status === 200) {
    console.log('troca de pagina');

    window.location.href = '../../pages/pre-checkin/finalizacao.html';
    return;
  }

  if (response.status === 403) {
    console.log('Usuario nao existe ou ja cadastrado!');
    return;
  }

  debugger;
}

let form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  setTimeout(() => {
    form.reset();
  }, 2000);
});

btnSubmit.addEventListener('click', sendCheckin);
