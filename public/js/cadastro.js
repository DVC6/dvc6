// const $nomeFantasia = document.querySelector('.inputNomeFantasia');
// const $estado = document.querySelector('.inputEstado');
// const $inputCidade = document.querySelector('.inputCidade');
// const $cnpj = document.querySelector('.inputCNPJ');
// const $email = document.querySelector('.inputEmail');
// const $senha = document.querySelector('.inputSenha');
// const $telefone = document.querySelector('.inputTelefone');
// const $enderecoEmpresa = document.querySelector('.inputEnderecoEmpresa');
// const $numero = document.querySelector('.inputNumero');
// const $bairro = document.querySelector('.inputBairro');
// const $site = document.querySelector('.inputSite');
// const btnSubmit = document.querySelector('.inputSubmit');

// const URL = 'http://localhost:3334';

// async function cadastrar() {
//   const nomeFantasia = $nomeFantasia.value;
//   const cnpj = $cnpj.value;
//   const email = $email.value;
//   const senha = $senha.value;
//   const logradouro = $enderecoEmpresa.value;
//   const numero = $numero.value;
//   const cidade = $inputCidade.value;
//   const estado = $estado.value;
//   const bairro = $bairro.value;
//   const telefone = $telefone.value;
//   const site = $site.value;

//   function validarCadastro() {
//     if (
//       nomeFantasia === '' ||
//       cnpj === '' ||
//       email === '' ||
//       senha === '' ||
//       logradouro === '' ||
//       numero === '' ||
//       cidade === '' ||
//       estado === '' ||
//       bairro === '' ||
//       telefone === '' ||
//       site === ''
//     ) {
//       if (site === '') {
//         $site.classList.add('inputError');
//       } else if (!site.includes('www') && !site.includes('.com')) {
//         $site.classList.add('inputError');
//       } else {
//         $site.classList.remove('inputError');
//       }

//       if (nomeFantasia === '') {
//         $nomeFantasia.classList.add('inputError');
//       } else {
//         $nomeFantasia.classList.remove('inputError');
//       }

//       if (cnpj === '') {
//         $cnpj.classList.add('inputError');
//       } else if (cnpj.length < 18) {
//         $cnpj.classList.add('inputError');
//       } else {
//         $cnpj.classList.remove('inputError');
//       }

//       if (email === '') {
//         $email.classList.add('inputError');
//       } else if (!email.includes('@')) {
//         $email.classList.add('inputError');
//       } else {
//         $email.classList.remove('inputError');
//       }

//       if (senha === '') {
//         $senha.classList.add('inputError');
//       } else if (senha.length < 8) {
//         $senha.classList.add('inputError');
//       } else {
//         $senha.classList.remove('inputError');
//       }

//       if (logradouro === '') {
//         $enderecoEmpresa.classList.add('inputError');
//       } else {
//         $enderecoEmpresa.classList.remove('inputError');
//       }

//       if (numero === '') {
//         $numero.classList.add('inputError');
//       } else {
//         $numero.classList.remove('inputError');
//       }

//       if (cidade === '') {
//         $inputCidade.classList.add('inputError');
//       } else {
//         $inputCidade.classList.remove('inputError');
//       }

//       if (estado === '') {
//         $estado.classList.add('inputError');
//       } else {
//         $estado.classList.remove('inputError');
//       }

//       if (bairro === '') {
//         $bairro.classList.add('inputError');
//       } else {
//         $bairro.classList.remove('inputError');
//       }

//       if (telefone === '') {
//         $telefone.classList.add('inputError');
//         return;
//       } else if (telefone.length < 11) {
//         $telefone.classList.add('inputError');
//         return;
//       } else {
//         $telefone.classList.remove('inputError');
//       }

//       return;
//     }
//   }

//   validarCadastro();

//   const data = {
//     nomeFantasia,
//     cnpj,
//     email,
//     senha,
//     logradouro,
//     numero,
//     cidade,
//     estado,
//     bairro,
//     telefone,
//     site,
//   };

//   try {
//     const response = await fetch(`${URL}/hospitais/cadastrar`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     if ((response.status == 200)) {
//       console.log('Cadastro realizado com sucesso!');
//       setInterval(() => {
//         window.location.href = '/pages/login.html';
//       }, 2000);
//     }

//     if ((response.status == 500)) {
//       console.log('Houve um erro ao realizar o cadastro', response);
//     }
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       return;
//     }
//   }
// }

// btnSubmit.addEventListener('click', cadastrar);

/* --------NOVA VALIDAÇÃO DAS INPUTS NO CSS---------- */

const idusername = document.getElementById("username");
const idsite = document.getElementById("site");
const idtelefone = document.getElementById("telefone");
const idemail = document.getElementById("email");
const idpassword = document.getElementById("password");
const idcep = document.getElementById("cep");
const idestado = document.getElementById("estado");
const idcidade = document.getElementById("cidade");
const idbairro = document.getElementById("bairro");
const idlogradouro = document.getElementById("logradouro");
const idcnpj = document.getElementById("cnpj");
const idnumero = document.getElementById("numero");

const URL = "http://localhost:3334";

var nomeFantasia;
var site;
var telefone;
var email;
var senha;
var cep;
var estado;
var cidade;
var bairro;
var logradouro;
var cnpj;
var numero;

async function cadastrar() {
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
    data.nomeFantasia == undefined &&
    data.site == undefined &&
    data.telefone == undefined &&
    data.email == undefined &&
    data.senha == undefined &&
    data.cep == undefined &&
    data.estado == undefined &&
    data.cidade == undefined &&
    data.bairro == undefined &&
    data.logradouro == undefined &&
    data.cnpj == undefined &&
    data.numero == undefined) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "Preencha todos os campos";
    setInterval(sumirMensagem, 5000)
  } else {
    try {
      const response = await fetch(`${URL}/hospitais/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        console.log("Cadastro realizado com sucesso!");
        mensagem_erro.innerHTML = "Cadastro realizado";
        cardErro.style.display = "block";
        setInterval(() => {
          window.location.href = "/pages/login.html";
        }, 2000);
      }

      if (response.status == 500) {
        console.log("Houve um erro ao realizar o cadastro", response);
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
  // pegar valor da input
  const usernameValue = idusername.value.trim();

  if (usernameValue.length > 0) {
    // adiciona success class
    setSuccessFor(idusername);
    nomeFantasia = usernameValue;
  } else {
    // mostrar error
    // adicionar error class
    setErrorFor(idusername, "Nome inválido");
  }
}

function checkSite() {
  const siteValue = idsite.value.trim();
  if (
    siteValue.length > 0 &&
    siteValue.indexOf("www") > -1 &&
    siteValue.endsWith(".com")
  ) {
    setSuccessFor(idsite);
    site = siteValue;
  } else {
    setErrorFor(idsite, "Site inválido");
  }
}

function checkTelefone() {
  const telefoneValue = idtelefone.value.trim();
  if (telefoneValue.length > 10) {
    setSuccessFor(idtelefone);
    telefone = telefoneValue;
  } else {
    setErrorFor(idtelefone, "Telefone inválido");
  }
}

function checkEmail() {
  const emailValue = idemail.value.trim();
  if (
    emailValue.length > 0 &&
    emailValue.indexOf("@") > -1 &&
    emailValue.endsWith(".com")
  ) {
    setSuccessFor(idemail);
    email = emailValue;
  } else {
    setErrorFor(idemail, "Email inválido");
  }
}

function checkPassword() {
  const passwordValue = idpassword.value.trim();
  if (passwordValue.length > 7) {
    setSuccessFor(idpassword);
    senha = passwordValue;
  } else {
    setErrorFor(idpassword, "Senha inválido");
  }
}

function checkCEP() {
  const cepValue = idcep.value.trim();
  if (cepValue.length >= 8) {
    setSuccessFor(idcep);
    cep = cepValue;
  } else {
    setErrorFor(idcep, "CEP inválido");
  }
}

function checkEstado() {
  const estadoValue = idestado.value.trim();
  if (estadoValue.length > 0) {
    setSuccessFor(idestado);
    estado = estadoValue;
  } else {
    setErrorFor(idestado, "Estado inválido");
  }
}

function checkCidade() {
  const cidadeValue = idcidade.value.trim();
  if (cidadeValue.length > 0) {
    setSuccessFor(idcidade);
    cidade = cidadeValue;
  } else {
    setErrorFor(idcidade, "Cidade inválido");
  }
}

function checkBairro() {
  const bairroValue = idbairro.value.trim();
  if (bairroValue.length > 0) {
    setSuccessFor(idbairro);
    bairro = bairroValue;
  } else {
    setErrorFor(idbairro, "Bairro inválido");
  }
}

function checkLogradouro() {
  const logradouroValue = idlogradouro.value.trim();
  if (logradouroValue.length > 0) {
    setSuccessFor(idlogradouro);
    logradouro = logradouroValue;
  } else {
    setErrorFor(idlogradouro, "Logradouro inválido");
  }
}

function checkCNPJ() {
  const cnpjValue = idcnpj.value.trim();
  if (cnpjValue.length > 17) {
    setSuccessFor(idcnpj);
    cnpj = cnpjValue;
  } else {
    setErrorFor(idcnpj, "CNPJ inválido");
  }
}

function checkNumero() {
  const numeroValue = idnumero.value.trim();
  if (numeroValue.length > 0) {
    setSuccessFor(idnumero);
    numero = numeroValue;
  } else {
    setErrorFor(idnumero, "Número inválido");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; // .form-control
  const small = formControl.querySelector("small");

  // add error message inside small
  small.innerText = message;

  // add error class
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
/* -------------------------------------------------- */
function sumirMensagem() {
  cardErro.style.display = "none"
}
