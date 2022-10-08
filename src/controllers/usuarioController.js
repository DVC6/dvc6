var usuarioModel = require("../models/usuarioModel");

function listar(req, res) {
  const fkHospital = req.body;

  if (fkHospital == undefined) {
    res.status(400).send("Sua fkHospital está undefined");
  } else {
    usuarioModel
      .listar()
      .then(function (resultado) {
        if (resultado.length > 0) {
        } else {
          res.status(404).send("Nenhum resultado encotrado");
        }
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function entrar(req, res) {
  const { email, senha } = req.body;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  const { nome, senha, email, cargo, fkHospital } = req.body;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined");
  } else if (fkHospital == undefined) {
    res.status(400).send("Sua fkHospital está undefined");
  } else {
    usuarioModel
      .cadastrar(nome, senha, email, cargo, fkHospital)
      .then(function (resultado) {
        res.json(resultado);

        req.session.hospId = email;
        console.log("Usuario cadastrado");
        req.session.save(() => {
          res.redirect("/");
        });
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function alterarSenha(req, res) {
  const { senha, email } = req.body;

  if (!email || email == undefined) {
    res.status(404).send("Insira um e-mail valido!");
  } else {
    usuarioModel
      .alterarSenha(senha, email)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function deletar(req, res) {
  var email = req.body.email;

  if (!email || email == undefined) {
    res.status(404).send("Email nao encontrado!");
  } else {
    usuarioModel
      .deletar(email)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          "\n Houve um erro ao tentar deletar o usuario! Erro: ",
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  alterarSenha,
  deletar,
};
