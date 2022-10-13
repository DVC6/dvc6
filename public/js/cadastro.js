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

const username = document.getElementById("username");
const site = document.getElementById("site");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cep = document.getElementById("cep");
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const logradouro = document.getElementById("logradouro");
const cnpj = document.getElementById("cnpj");
const numero = document.getElementById("numero");

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

function checkUsername() {
  // pegar valor da input
  const usernameValue = username.value.trim();

  if (usernameValue.length > 0) {
    // adiciona success class
    setSuccessFor(username);
  } else {
    // mostrar error
    // adicionar error class
    setErrorFor(username, "Nome inválido");
  }
}

function checkSite() {
  const siteValue = site.value.trim();
  if (
    siteValue.length > 0 &&
    siteValue.indexOf("www") > -1 &&
    siteValue.endsWith(".com")
  ) {
    setSuccessFor(site);
  } else {
    setErrorFor(site, "Site inválido");
  }
}

function checkTelefone() {
  const telefoneValue = telefone.value.trim();
  if (telefoneValue.length > 10) {
    setSuccessFor(telefone);
  } else {
    setErrorFor(telefone, "Telefone inválido");
  }
}

function checkEmail() {
  const emailValue = email.value.trim();
  if (
    emailValue.indexOf("@") > -1 &&
    emailValue.indexOf(".") > -1 &&
    emailValue.length > 0 &&
    emailValue.endsWith("com")
  ) {
    setSuccessFor(email);
  } else {
    setErrorFor(email, "Email inválido");
  }
}

function checkPassword() {
  const passwordValue = password.value.trim();
  if (passwordValue.length > 0) {
    setSuccessFor(password);
  } else {
    setErrorFor(password, "Senha inválido");
  }
}

function checkCEP() {
  const cepValue = cep.value.trim();
  if (cepValue.length >= 8) {
    setSuccessFor(cep);
  } else {
    setErrorFor(cep, "CEP inválido");
  }
}

function checkEstado() {
  const estadoValue = estado.value.trim();
  if (estadoValue.length > 0) {
    setSuccessFor(estado);
  } else {
    setErrorFor(estado, "Estado inválido");
  }
}

function checkCidade() {
  const cidadeValue = cidade.value.trim();
  if (cidadeValue.length > 0) {
    setSuccessFor(cidade);
  } else {
    setErrorFor(cidade, "Cidade inválido");
  }
}

function checkBairro() {
  const bairroValue = bairro.value.trim();
  if (bairroValue.length > 0) {
    setSuccessFor(bairro);
  } else {
    setErrorFor(bairro, "Bairro inválido");
  }
}

function checkLogradouro() {
  const logradouroValue = logradouro.value.trim();
  if (logradouroValue.length > 0) {
    setSuccessFor(logradouro);
  } else {
    setErrorFor(logradouro, "Logradouro inválido");
  }
}

function checkCNPJ() {
  const cnpjValue = cnpj.value.trim();
  if (cnpjValue.length > 17) {
    setSuccessFor(cnpj);
  } else {
    setErrorFor(cnpj, "CNPJ inválido");
  }
}

function checkNumero() {
  const numeroValue = numero.value.trim();
  if (numeroValue.length > 0) {
    setSuccessFor(numero);
  } else {
    setErrorFor(numero, "Número inválido");
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
