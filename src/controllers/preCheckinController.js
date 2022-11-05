const preCheckinModel = require('../models/preCheckinModel');
const storage = require('node-sessionstorage');
const PDFDocument = require('pdfkit');

function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(20).text(`Informações do Pré-Check-in`, 100, 100);

  const nome = storage.getItem('NOME');
  const email = storage.getItem('EMAIL');
  const rg = storage.getItem('RG');
  const cpf = storage.getItem('CPF');
  const dataCheckin = storage.getItem('DATA_CHECKIN');
  const idade = storage.getItem('IDADE');
  const motivo = storage.getItem('MOTIVO');
  const dataDeHoje = new Date().toLocaleDateString();

  doc.fontSize(18).text(`Nome: ${nome}`, 100, 150);
  doc.fontSize(18).text(`Email: ${email}`, 100, 200);
  doc.fontSize(18).text(`RG: ${rg}`, 100, 250);
  doc.fontSize(18).text(`CPF: ${cpf}`, 100, 300);
  doc.fontSize(18).text(`Data de Check-in: ${dataCheckin}`, 100, 350);
  doc.fontSize(18).text(`Idade: ${idade}`, 100, 400);
  doc.fontSize(18).text(`Motivo: ${motivo}`, 100, 450);
  doc.fontSize(18).text(`Data de hoje: ${dataDeHoje}`, 100, 500);
  doc
    .fontSize(12)
    .text(
      `Apresente-se no hospital com o documento de identificação e o comprovante de pré-check-in.`
    );
  doc.end();
}

function relizarPreCheckin(req, res) {
  const {
    nome,
    email,
    rg,
    cpf,
    dataCheckin,
    idade,
    optionTipoConsulta,
    fkHospital,
  } = req.body;

  storage.setItem('NOME', nome);
  storage.setItem('EMAIL', email);
  storage.setItem('RG', rg);
  storage.setItem('CPF', cpf);
  storage.setItem('DATA_CHECKIN', dataCheckin);
  storage.setItem('IDADE', idade);
  storage.setItem('MOTIVO', optionTipoConsulta);

  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!');
  }
  if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  }
  if (rg == undefined) {
    res.status(400).send('Seu rg está undefined!');
  }
  if (cpf == undefined) {
    res.status(400).send('Seu cpf está undefined!');
  }
  if (dataCheckin == undefined) {
    res.status(400).send('Sua data de consulta está undefined!');
  }
  if (idade == undefined) {
    res.status(400).send('Sua data de nascimento está undefined!');
  }
  if (optionTipoConsulta == undefined) {
    res.status(400).send('Seu tipo de consulta está undefined!');
  }
  if (fkHospital == undefined) {
    res.status(400).send('Seu hospital está undefined!');
  }

  preCheckinModel
    .relizarPreCheckin(
      nome,
      email,
      rg,
      cpf,
      dataCheckin,
      idade,
      optionTipoConsulta,
      fkHospital
    )
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log('Erro ao agendar consulta: ' + erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  relizarPreCheckin,
  buildPDF,
};
