var hospitalModel = require('../models/hospitalModel');

function listar(req, res) {
  hospitalModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
      } else {
        res.status(204).send('Nenhum resultado encontrado!');
      }
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function entrar(req, res) {
  const { email, senha } = req.body;

  if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está indefinida!');
  } else {
    hospitalModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send('Email e/ou senha inválido(s)');
        } else {
          res.status(403).send('Mais de um usuário com o mesmo login e senha!');
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          '\nHouve um erro ao realizar o login! Erro: ',
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  const {
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
  } = req.body;

  if (nomeFantasia == undefined) {
    res.status(400).send('Seu nome está undefined!');
  } else if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (telefone == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (logradouro == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (numero == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (bairro == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (cidade == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (estado == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (site == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else {
    hospitalModel
      .cadastrar(
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
        site
      )
      .then(function (resultado) {
        res.json(resultado);

        req.session.hospId = email;
        console.log('Usuario cadastrado');
        req.session.save(() => {
          res.redirect('/');
        });
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function alterarSenha(req, res) {
  const { senha, email } = req.body;

  if (!email || email == undefined) {
    res.status(404).send('Insira um e-mail valido!');
  } else {
    hospitalModel
      .alterarSenha(senha, email)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          error.sqlMessage
        );
        res.status(500).json(error.sqlMessage);
      });
  }
}

function deletar(req, res) {
  var email = req.body.email;

  if (!email || email == undefined) {
    res.status(404).send('Email nao encontrado!');
  } else {
    hospitalModel
      .deletar(email)
      .then((resultado) => res.json(resultado))
      .catch((error) => {
        console.log(error);
        console.log(
          '\n Houve um erro ao tentar deletar o usuario! Erro: ',
          error.sqlMessage
        );
        res.status(500).json(errpr.sqlMessage);
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
