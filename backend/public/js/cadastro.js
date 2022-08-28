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

  try {
    const response = await fetch(`${URL}/hospitais/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nomeFantasia,
        cnpj,
        email,
        senha,
        telefone,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        site,
      }),
    });
    if ((response.status = 200)) {
      console.log('Cadastro realizado com sucesso!');
      setInterval(() => {
        window.location.href = '/pages/login.html';
      }, 2000);
    }

    if ((response.status = 500)) {
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
