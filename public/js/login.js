const idemail = document.getElementById('email');
const idpassword = document.getElementById('password');

async function entrarAdmin() {
  checkEmail();
  checkPassword();

  const email = idemail.value;
  const senha = idpassword.value;

  if (email == undefined || email == '' || senha == undefined || senha == '') {
    cardErro.style.display = 'block';
    mensagem_erro.innerHTML = 'Erro!<br>Preencha todos os campos corretamente';
    setInterval(sumirMensagem, 5000);
    return;
  } else if (
    !email.length > 0 ||
    !email.includes('@') ||
    !email.endsWith('.com')
  ) {
    return;
  } else if (senha.length < 8) {
    return;
  } else {
    try {
      const response = await fetch(`/hospitais/autenticar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log(
          response.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.LOGIN_HOSPITAL = json.nome_fantasia;
            sessionStorage.ID_HOSPITAL = json.id_hospital;
          })
        );
        mensagem_erro.innerHTML = 'Login realizado com sucesso';
        cardErro.style.display = 'block';
        setInterval(() => {
          window.location.href = 'dashboardTotem.html';
        }, 2000);
      }

      if (response.status === 403) {
        console.log('Usuario nao existe ou ja cadastrado!');
        mensagem_erro.innerHTML = 'Usuario nao existe ou ja cadastrado!';
        cardErro.style.display = 'block';
        setInterval(sumirMensagem, 5000);
        return;
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return;
      }
    }
  }
}

async function entrarFuncionario() {
  checkEmail();
  checkPassword();

  const email = idemail.value;
  const senha = idpassword.value;

  if (email == undefined || email == '' || senha == undefined || senha == '') {
    cardErro.style.display = 'block';
    mensagem_erro.innerHTML = 'Erro!<br>Preencha todos os campos corretamente';
    setInterval(sumirMensagem, 5000);
    return;
  } else if (
    !email.length > 0 ||
    !email.includes('@') ||
    !email.endsWith('.com')
  ) {
    return;
  } else if (senha.length < 8) {
    return;
  } else {
    try {
      const response = await fetch(`/usuarios/autenticar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log(
          response.json().then((json) => {
            if (json.cargo == 'recepcionista') {
              sessionStorage.LOGIN_FUNCIONARIO = json.nome_funcionario;
              sessionStorage.ID_FUNCIONARIO = json.id_funcionario;
              sessionStorage.ID_HOSPITAL = json.fkhospital;
              sessionStorage.CARGO = json.cargo;

              mensagem_erro.innerHTML = 'Login realizado com sucesso';
              cardErro.style.display = 'block';
              console.log('ENTROU NA DASHBOARD DE PRE-CHECKIN');
              setInterval(() => {
                window.location.href = 'dashboardPreCheckin.html';
              }, 2000);
              return;
            }
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.LOGIN_FUNCIONARIO = json.nome_funcionario;
            sessionStorage.ID_FUNCIONARIO = json.id_funcionario;
            sessionStorage.ID_HOSPITAL = json.fkhospital;
            sessionStorage.CARGO = json.cargo;
          })
        );
        mensagem_erro.innerHTML = 'Login realizado com sucesso';
        cardErro.style.display = 'block';
        setInterval(() => {
          window.location.href = 'dashboardTotem.html';
        }, 2000);
      }

      if (response.status === 403) {
        console.log('Usuario nao existe ou ja cadastrado!');
        mensagem_erro.innerHTML = 'Usuario nao existe ou ja cadastrado!';
        cardErro.style.display = 'block';
        setInterval(sumirMensagem, 5000);
        return;
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return;
      }
    }
  }
}

function checkEmail() {
  const emailValue = idemail.value.trim();
  if (
    emailValue != '' &&
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
  if (passwordValue != '' && passwordValue.length > 7) {
    setSuccessFor(idpassword);
  } else {
    setErrorFor(idpassword, 'Senha inválido');
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  small.innerText = message;

  formControl.className = 'id error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'id success';
}

function sumirMensagem() {
  cardErro.style.display = 'none';
}
