let inptNome = document.querySelector('.input_nome');
let inptEmail = document.querySelector('.input_email');
let inptCpf = document.querySelector('.input_cpf');
let btnSubmit = document.querySelector('.btn_finalizar');
let btnCancel = document.querySelector('.btn_cancelar');
let caixa = document.querySelector('.caixa');
let inputDtCheckin = document.querySelector('.input_data_consulta');
let inputDtNascimento = document.querySelector('.input_data_nascimento');
let selectMotivoPrecheckin = document.getElementById(
  'select_motivo_precheckin'
);
let selectNomeHospital = document.getElementById('select_hospitais_precheckin');

var optionTipoConsulta;
var optionNomeHospital;
var optionIdHospital;

selectMotivoPrecheckin.addEventListener('change', function () {
  optionTipoConsulta = selectMotivoPrecheckin.value;
});

selectNomeHospital.addEventListener('change', function () {
  optionNomeHospital =
    selectNomeHospital.options[selectNomeHospital.selectedIndex].innerHTML;

  optionIdHospital = selectNomeHospital.value;
});

async function sendCheckin() {
  const nome = inptNome.value;
  const email = inptEmail.value;
  const cpf = inptCpf.value;
  const dataCheckin = inputDtCheckin.value;
  const dataAtual = new Date();
  const dataNascimento = new Date(inputDtNascimento.value);

  const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

  const fkHospital = Number(optionIdHospital);
  const data = {
    nome,
    email,
    cpf,
    dataCheckin,
    idade,
    optionTipoConsulta,
    optionNomeHospital,
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
    window.location.href = '../../pages/pre-checkin/finalizacao.html';
    return;
  }

  if (response.status === 403) {
    console.log('Usuario nao existe ou ja cadastrado!');
    return;
  }
}

let form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  setTimeout(() => {
    form.reset();
  }, 2000);
});

btnSubmit.addEventListener('click', sendCheckin);
