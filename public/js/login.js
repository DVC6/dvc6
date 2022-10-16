// const $inputEmail = document.querySelector('.inputEmail');
// const $inputSenha = document.querySelector('.inputSenha');
// const $loginSubmit = document.querySelector('.loginSubmit');

// const URL = 'http://localhost:3334';

// async function loginTeste() {
//   // debugger;
//   console.log("teste teste teste")
//   const email = $inputEmail.value;
//   const senha = $inputSenha.value;

//   if (email === '' || senha === '') {
//     if (email === '') {
//       $inputEmail.classList.add('inputError');
//     } else {
//       $inputEmail.classList.remove('inputError');
//     }

//     if (senha === '') {
//       $inputSenha.classList.add('inputError');
//     } else if (senha.length < 8) {
//       $inputSenha.classList.add('inputError');
//     } else {
//       $inputSenha.classList.remove('inputError');
//     }
//     return;
//   }

//   if (!email.includes('@')) {
//     alert('Email inválido');

//     if (email === '') {
//       $inputEmail.classList.add('inputError');
//       $inputEmail.previousElementSibling.classList.add('labelError');
//     } else {
//       $inputEmail.classList.remove('inputError');
//       $inputEmail.previousElementSibling.classList.remove('labelError');
//     }
//     return;
//   }

//   if (senha.length < 8) {
//     alert('Senha deve ter no mínimo 8 caracteres');

//     if (senha === '') {
//       $inputSenha.classList.add('inputError');
//       $inputSenha.previousElementSibling.classList.add('labelError');
//     } else {
//       $inputSenha.classList.remove('inputError');
//       $inputSenha.previousElementSibling.classList.remove('labelError');
//     }

//     return;
//   }

//   try {
//     const response = await fetch(`${URL}/hospitais/autenticar`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         senha,
//       }),
//     });

//     console.log(response)
//     if (response.ok) {
//       console.log(
//         response.json().then((json) => {
//           sessionStorage.LOGIN_HOSPITAL = json.nomeFantasia;
//           sessionStorage.ID_HOSPITAL = json.idHospital;
//         })
//       );
//       setInterval(() => {
//         window.location.href = "dashboardAdm.html";
//       }, 2000);
//     }

//     if (response.status === 403) {
//       console.log('Usuario nao existe ou ja cadastrado!');
//       return;
//     }
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       return;
//     }
//   }
// }

// function validarSessao() {
//   const nomeFantasia = sessionStorage.LOGIN_HOSPITAL;

//   if (nomeFantasia != null) {
//     nomeUsuario.innerHTML = (`${nomeFantasia}`);
//   } else {
//     window.location = '../pages/login.html';
//   }
// }

// $loginSubmit.addEventListener('click', loginTeste());

// function deslogar() {
//   delete sessionStorage.LOGIN_HOSPITAL;
// }

/* --------NOVA VALIDAÇÃO DAS INPUTS NO CSS---------- */

const idemail = document.getElementById("email");
const idpassword = document.getElementById("password");

const URL = "http://localhost:3334";

async function loginTeste() {
  checkEmail();
  checkPassword();

  const email = idemail.value;
  const senha = idpassword.value;

  /* ---- VALIDAÇÃO BACK ----- */

  if (email == undefined || email == "" || senha == undefined || senha == "") {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "Erro!<br>Preencha todos os campos e corretamente";
    setInterval(sumirMensagem, 5000);
    return;
  } else if (
    !email.length > 0 ||
    !email.includes("@") ||
    !email.endsWith(".com")
  ) {
    return;
  } else if (senha.length < 8) {
    return;
  } else {
    try {
      const response = await fetch(`${URL}/hospitais/autenticar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        mensagem_erro.innerHTML = "Login realizado com sucesso";
        cardErro.style.display = "block";
        setInterval(() => {
          window.location.href = "dashboardAdm.html";
        }, 2000);
      }

      if (response.status === 403) {
        console.log("Usuario nao existe ou ja cadastrado!");
        mensagem_erro.innerHTML = "Usuario nao existe ou ja cadastrado!";
        cardErro.style.display = "block";
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

/* --------- VALIDAÇÃO FRONT ----------- */

function checkEmail() {
  const emailValue = idemail.value.trim();
  if (
    emailValue != "" &&
    emailValue.length > 0 &&
    emailValue.indexOf("@") > -1 &&
    emailValue.endsWith(".com")
  ) {
    setSuccessFor(idemail);
  } else {
    setErrorFor(idemail, "Email inválido");
  }
}

function checkPassword() {
  const passwordValue = idpassword.value.trim();
  if (passwordValue != "" && passwordValue.length > 7) {
    setSuccessFor(idpassword);
  } else {
    setErrorFor(idpassword, "Senha inválido");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; // .id
  const small = formControl.querySelector("small");

  // adiciona a mensagem de erro dentro do small
  small.innerText = message;

  // adiciona a classe error
  formControl.className = "id error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "id success";
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
