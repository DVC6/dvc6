const $nomeFantasia = document.querySelector('.inputNomeFantasia');
const $estado = document.querySelector('.inputEstado');
const $inputCidade = document.querySelector('.inputCidade');
const $cnpj = document.querySelector('.inputCNPJ');
const $email = document.querySelector('.inputEmail');
const $senha = document.querySelector('.inputSenha');
const $telefone = document.querySelector('.inputTelefone');
const $enderecoEmpresa = document.querySelector('.inputEnderecoEmpresa');
const $numero = document.querySelector('.inputNumero');
const $bairro = document.querySelector('.inputBairro');
const $site = document.querySelector('.inputSite');
const btnSubmit = document.querySelector('.inputSubmit');

const URL = 'http://localhost:3334';

async function cadastrar() {
  const nomeFantasia = $nomeFantasia.value;
  const cnpj = $cnpj.value;
  const email = $email.value;
  const senha = $senha.value;
  const logradouro = $enderecoEmpresa.value;
  const numero = $numero.value;
  const cidade = $inputCidade.value;
  const estado = $estado.value;
  const bairro = $bairro.value;
  const telefone = $telefone.value;
  const site = $site.value;

  function validarCadastro() {
    if (
      nomeFantasia === '' ||
      cnpj === '' ||
      email === '' ||
      senha === '' ||
      logradouro === '' ||
      numero === '' ||
      cidade === '' ||
      estado === '' ||
      bairro === '' ||
      telefone === '' ||
      site === ''
    ) {
      if (site === '') {
        $site.classList.add('inputError');
      } else if (!site.includes('www') && !site.includes('.com')) {
        $site.classList.add('inputError');
      } else {
        $site.classList.remove('inputError');
      }

      if (nomeFantasia === '') {
        $nomeFantasia.classList.add('inputError');
      } else {
        $nomeFantasia.classList.remove('inputError');
      }

      if (cnpj === '') {
        $cnpj.classList.add('inputError');
      } else if (cnpj.length < 18) {
        $cnpj.classList.add('inputError');
      } else {
        $cnpj.classList.remove('inputError');
      }

      if (email === '') {
        $email.classList.add('inputError');
      } else if (!email.includes('@')) {
        $email.classList.add('inputError');
      } else {
        $email.classList.remove('inputError');
      }

      if (senha === '') {
        $senha.classList.add('inputError');
      } else if (senha.length < 8) {
        $senha.classList.add('inputError');
      } else {
        $senha.classList.remove('inputError');
      }

      if (logradouro === '') {
        $enderecoEmpresa.classList.add('inputError');
      } else {
        $enderecoEmpresa.classList.remove('inputError');
      }

      if (numero === '') {
        $numero.classList.add('inputError');
      } else {
        $numero.classList.remove('inputError');
      }

      if (cidade === '') {
        $inputCidade.classList.add('inputError');
      } else {
        $inputCidade.classList.remove('inputError');
      }

      if (estado === '') {
        $estado.classList.add('inputError');
      } else {
        $estado.classList.remove('inputError');
      }

      if (bairro === '') {
        $bairro.classList.add('inputError');
      } else {
        $bairro.classList.remove('inputError');
      }

      if (telefone === '') {
        $telefone.classList.add('inputError');
        return;
      } else if (telefone.length < 11) {
        $telefone.classList.add('inputError');
        return;
      } else {
        $telefone.classList.remove('inputError');
      }

      return;
    }
  }

  validarCadastro();

  const data = {
    nomeFantasia,
    cnpj,
    email,
    senha,
    logradouro,
    numero,
    cidade,
    estado,
    bairro,
    telefone,
    site,
  };

  try {
    const response = await fetch(`${URL}/hospital/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if ((response.status == 200)) {
      console.log('Cadastro realizado com sucesso!');
      setInterval(() => {
        window.location.href = '/pages/login.html';
      }, 2000);
    }

    if ((response.status == 500)) {
      console.log('Houve um erro ao realizar o cadastro', response);
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return;
    }
  }
}

btnSubmit.addEventListener('click', cadastrar);
