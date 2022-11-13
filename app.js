// process.env.AMBIENTE_PROCESSO = 'desenvolvimento';
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 3334;
var app = express();

var feedbackRouter = require("./src/routes/feedbackRouter");
var indexRouter = require("./src/routes/index");
var hospitalRouter = require("./src/routes/hospitalRouter");
var dashboardRouter = require("./src/routes/dashboardRouter");
var usuarioRouter = require("./src/routes/usuarioRouter");
var relatorioRouter = require("./src/routes/relatorioRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/hospitais", hospitalRouter);
app.use("/dashboard", dashboardRouter);
app.use("/usuarios", usuarioRouter);
app.use("/feedback", feedbackRouter);
app.use("/relatorio", relatorioRouter);

app.listen(PORTA, function () {
  console.log(`Servidor do site está rodando rodando: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", banco local (MySQL Workbench). \n
    \t\tSe "producao", banco remoto (SQL Server em nuvem Azure)`);
});
