const idusername = document.getElementById('username');
const idsite = document.getElementById('site');
const idtelefone = document.getElementById('telefone');
const idemail = document.getElementById('email');
const idpassword = document.getElementById('password');
const idcep = document.getElementById('cep');
const idestado = document.getElementById('estado');
const idcidade = document.getElementById('cidade');
const idbairro = document.getElementById('bairro');
const idlogradouro = document.getElementById('logradouro');
const idcnpj = document.getElementById('cnpj');
const idnumero = document.getElementById('numero');

const URL = 'http://localhost:3334';

async function cadastrar() {
  const nomeFantasia = idusername.value;
  const site = idsite.value;
  const telefone = idtelefone.value;
  const email = idemail.value;
  const senha = idpassword.value;
  const cep = idcep.value;
  const estado = idestado.value;
  const cidade = idcidade.value;
  const bairro = idbairro.value;
  const logradouro = idlogradouro.value;
  const cnpj = idcnpj.value;
  const numero = idnumero.value;

  checkUsername();
  checkSite();
  checkTelefone();
  checkEmail();
  checkPassword();
  checkCEP();
  checkEstado();
  checkCidade();
  checkBairro();
  checkLogradouro();
  checkCNPJ();
  checkNumero();

  const data = {
    nomeFantasia,
    site,
    telefone,
    email,
    senha,
    cep,
    estado,
    cidade,
    bairro,
    logradouro,
    cnpj,
    numero,
  };

  if (
    data.nomeFantasia == undefined ||
    data.nomeFantasia == '' ||
    data.site == undefined ||
    data.site == '' ||
    data.telefone == undefined ||
    data.telefone == '' ||
    data.email == undefined ||
    data.email == '' ||
    data.senha == undefined ||
    data.senha == '' ||
    data.cep == undefined ||
    data.cep == '' ||
    data.estado == undefined ||
    data.estado == '' ||
    data.cidade == undefined ||
    data.cidade == '' ||
    data.bairro == undefined ||
    data.bairro == '' ||
    data.logradouro == undefined ||
    data.logradouro == '' ||
    data.cnpj == undefined ||
    data.cnpj == '' ||
    data.numero == undefined ||
    data.numero == ''
  ) {
    cardErro.style.display = 'block';
    mensagem_erro.innerHTML =
      'Erro!<br>Preencha todos os campos e corretamente';
    setInterval(sumirMensagem, 5000);
    return;
  } else if (
    !site.length > 0 ||
    !site.includes('www') ||
    !site.endsWith('.com')
  ) {
    return;
  } else if (telefone < 8) {
    return;
  } else if (
    !email.length > 0 ||
    !email.includes('@') ||
    !email.endsWith('.com')
  ) {
    return;
  } else if (senha.length < 8) {
    return;
  } else if (cep.length < 8) {
    return;
  } else if (cnpj.length < 18) {
    return;
  } else {
    try {
      const response = await fetch(`${URL}/hospitais/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        console.log('Cadastro realizado com sucesso!');
        mensagem_erro.innerHTML = 'Cadastro realizado';
        cardErro.style.display = 'block';
        setInterval(() => {
          window.location.href = '/pages/login.html';
        }, 2000);
      }

      if (response.status == 500) {
        console.log('Houve um erro ao realizar o cadastro', response);
        mensagem_erro.innerHTML = 'Houve um erro ao realizar o cadastro';
        cardErro.style.display = 'block';
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return;
      }
    }
  }
}

function checkUsername() {
  const usernameValue = idusername.value.trim();

  if (usernameValue.length > 0) {
    setSuccessFor(idusername);
  } else {
    setErrorFor(idusername, 'Nome inválido');
  }
}

function checkSite() {
  const siteValue = idsite.value.trim();
  if (
    siteValue.length > 0 &&
    siteValue.indexOf('www') > -1 &&
    siteValue.endsWith('.com')
  ) {
    setSuccessFor(idsite);
  } else {
    setErrorFor(idsite, 'Site inválido');
  }
}

function checkTelefone() {
  const telefoneValue = idtelefone.value.trim();
  if (telefoneValue.length > 10) {
    setSuccessFor(idtelefone);
  } else {
    setErrorFor(idtelefone, 'Telefone inválido');
  }
}

function checkEmail() {
  const emailValue = idemail.value.trim();
  if (
    emailValue.length > 0 &&
    emailValue.indexOf('@') > -1 &&
    emailValue.endsWith('.com')
  ) {
    setSuccessFor(idemail);
  } else {
    setErrorFor(idemail, 'Email inválido');
  }
}

function checkPassword() {
  const passwordValue = idpassword.value.trim();
  if (passwordValue.length > 7) {
    setSuccessFor(idpassword);
  } else {
    setErrorFor(idpassword, 'Senha inválido');
  }
}

function checkCEP() {
  const cepValue = idcep.value.trim();
  if (cepValue.length >= 8) {
    setSuccessFor(idcep);
  } else {
    setErrorFor(idcep, 'CEP inválido');
  }
}

function checkEstado() {
  const estadoValue = idestado.value.trim();
  if (estadoValue.length > 0) {
    setSuccessFor(idestado);
  } else {
    setErrorFor(idestado, 'Estado inválido');
  }
}

function checkCidade() {
  const cidadeValue = idcidade.value.trim();
  if (cidadeValue.length > 0) {
    setSuccessFor(idcidade);
  } else {
    setErrorFor(idcidade, 'Cidade inválido');
  }
}

function checkBairro() {
  const bairroValue = idbairro.value.trim();
  if (bairroValue.length > 0) {
    setSuccessFor(idbairro);
  } else {
    setErrorFor(idbairro, 'Bairro inválido');
  }
}

function checkLogradouro() {
  const logradouroValue = idlogradouro.value.trim();
  if (logradouroValue.length > 0) {
    setSuccessFor(idlogradouro);
  } else {
    setErrorFor(idlogradouro, 'Logradouro inválido');
  }
}

function checkCNPJ() {
  const cnpjValue = idcnpj.value.trim();
  if (cnpjValue.length > 17) {
    setSuccessFor(idcnpj);
  } else {
    setErrorFor(idcnpj, 'CNPJ inválido');
  }
}

function checkNumero() {
  const numeroValue = idnumero.value.trim();
  if (numeroValue.length > 0) {
    setSuccessFor(idnumero);
  } else {
    setErrorFor(idnumero, 'Número inválido');
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  small.innerText = message;

  formControl.className = 'form-control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
function sumirMensagem() {
  cardErro.style.display = 'none';
}
