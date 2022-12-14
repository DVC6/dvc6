var hospitalModel = require('../models/hospitalModel');

function listar(req, res) {
  console.log('Listando totems');

  hospitalModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send('Nenhum resultado encontrado!');
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao listar os totems.', erro.sqlMessage);
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
  console.table(req.body);
  const {
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
  } = req.body;

  if (nomeFantasia == undefined || nomeFantasia == '') {
    res.status(400).send('Seu nome está undefined!');
  } else if (email == undefined || email == '') {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined || senha == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (telefone == undefined || telefone == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (logradouro == undefined || logradouro == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (numero == undefined || numero == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (bairro == undefined || bairro == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (cidade == undefined || cidade == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (estado == undefined || estado == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (site == undefined || site == '') {
    res.status(400).send('Sua senha está undefined!');
  } else if (cep == undefined || cep == '') {
    res.status(400).send('Sua senha está undefined!');
  } else {
    hospitalModel
      .cadastrar(
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
        numero
      )
      .then(function (resultado) {
        res.json(resultado);

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
