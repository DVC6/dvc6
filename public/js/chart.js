/*---------------ATENÇÃO!!!!
SE QUISER A DASHBOARD DINÂMICA É SÓ COMENTAR 
AS DASHBOARDS QUE ESTÃO NO FINAL, NAS LINHAS 268 ATÉ 375
E DESCOMENTAR AS QUE ESTÃO NAS LINHAS 62 ATÉ 149.
--------------------------------------------------*/

/* --------------USAUARIO------------- */
// if (sessionStorage == sessionStorage.NOME_HOSPITAL) {
//   nomeUsuario.innerHTML = sessionStorage.NOME_HOSPITAL;
// } else {
//   nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;
// }

/* ---------------TOTEM--------------- */
nomeTotem.innerHTML = sessionStorage.NOME_TOTEM;

/* --------CONTADOR INCIDENTES--------*/

const date = new Date();
var contadorIncidentes = 0;
var houveIncidentes = false;

function apagarContador() {
  var dataAtual = date.getDate();
  var ultimaData = pegarUltimaData();

  if (ultimaData != dataAtual) {
    contadorIncidentes = 0;
  }
}
async function pegarUltimaData() {
  var ultimaData = await fetch(
    `/dashboard/buscarUltimaData/${sessionStorage.ID_TOTEM}`
  );
  ultimaData = await ultimaData.json();
  var contadorIncidentes = await document.getElementById("contadorIncidentes");
  var dataColetada = (contadorIncidentes.innerHTML = await ultimaData[0].dia);

  return dataColetada;
}

/* --------DASHBOARDS CHART JS--------*/

var memoria = document.getElementById("memoria").getContext("2d");
var cpu = document.getElementById("cpu").getContext("2d");

memoria.canvas.width = 500;
memoria.canvas.height = 120;
cpu.canvas.width = 500;
cpu.canvas.height = 120;

const gradientBg = memoria.createLinearGradient(0, 0, 0, 400);

gradientBg.addColorStop(0.1, "#2a82fe51");
gradientBg.addColorStop(0.5, "#2a82fe19");
gradientBg.addColorStop(0.7, "#2a82fe05");
gradientBg.addColorStop(1, "transparent");

const gradientBg2 = cpu.createLinearGradient(0, 0, 0, 400);

gradientBg2.addColorStop(0.1, "#fa1e4e74");
gradientBg2.addColorStop(0.5, "#fa1e4e19");
gradientBg2.addColorStop(0.7, "#2a82fe05");
gradientBg2.addColorStop(1, "transparent");

/* --------DASHBOARD MEMORIA RAM--------*/
var myChartMemoria = new Chart(memoria, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Consumo de RAM no servidor",
        data: [],
        backgroundColor: gradientBg,
        borderColor: ["#2a84fe"],
        borderWidth: 1,
        radius: 0,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    onResize: null,
    resizeDelay: 0,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100,
            min: 0,
          },
        },
      ],
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: false,
      tooltip: {
        yAlign: "bottom",
      },
    },
  },
});

/* --------DASHBOARD CPU--------*/
var myChartCpu = new Chart(cpu, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Consumo de CPU no servidor",
        data: [],
        backgroundColor: gradientBg2,
        borderColor: ["#fa1e4e"],
        borderWidth: 1,
        radius: 0,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    onResize: null,
    resizeDelay: 0,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100,
            min: 0,
          },
        },
      ],
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: false,
      tooltip: {
        yAlign: "bottom",
      },
    },
  },
});

/* ------------------------- VERIFICAÇÃO DOS DADOS --------------------------*/

async function get_dataRAMKPI() {
  var ultimoDadoRAM = await fetch(
    `/dashboard/buscarMedidasRAMKPI/${sessionStorage.ID_TOTEM}`
  );
  ultimoDadoRAM = await ultimoDadoRAM.json();
  var ramkpi = document.getElementById("ramkpiID");
  ramkpi.innerHTML = ultimoDadoRAM[0].consumo + "%";
  if (ultimoDadoRAM[0].consumo == undefined) {
    ramkpi.innerHTML = "0%";
  } else if (ultimoDadoRAM[0].consumo >= 90) {
    ramkpi.style.color = "#FF5050";
    houveIncidentes = true;
  } else if (ultimoDadoRAM[0].consumo >= 70) {
    ramkpi.style.color = "#FFEE1D";
  } else {
    ramkpi.style.color = "#12d74b";
  }
}

async function get_dataCPUKPI() {
  var ultimoDadoCPU = await fetch(
    `/dashboard/buscarMedidasCPUKPI/${sessionStorage.ID_TOTEM}`
  );
  ultimoDadoCPU = await ultimoDadoCPU.json();
  var cpukpi = document.getElementById("cpukpiID");
  cpukpi.innerHTML = ultimoDadoCPU[0].consumo + "%";
  if (ultimoDadoCPU[0].consumo == undefined) {
    cpukpi.innerHTML = "0%";
  } else if (ultimoDadoCPU[0].consumo >= 90) {
    cpukpi.style.color = "#FF5050";
    houveIncidentes = true;
  } else if (ultimoDadoCPU[0].consumo >= 70) {
    cpukpi.style.color = "#FFEE1D";
  } else {
    cpukpi.style.color = "#12d74b";
  }
}
/*----------------------------------------------------------------------------------*/

async function get_dataDisco() {
  const gaugeElement = document.querySelector(".gauge");
  var ultimoDadoDisco = await fetch(
    `/dashboard/buscarMedidasDisco/${sessionStorage.ID_TOTEM}`
  );
  ultimoDadoDisco = await ultimoDadoDisco.json();
  var discoUsado = await ultimoDadoDisco[0].consumo;

  function setGaugeValue(gauge, value) {
    if (value < 0 || value > 100) {
      return;
    } else if (value == undefined || value == "") {
      value = 0;
    }

    gauge.querySelector(".gauge__fill").style.transform = `rotate(${
      value / 200
    }turn)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value)}%`;
  }

  setGaugeValue(gaugeElement, discoUsado);
}

/*------------------------FUNÇÕES DE OBTENÇÃO DE DADOS--------------------------- */
async function get_dataRAM() {
  var tempoRealRAM = await fetch(
    `/dashboard/buscarMedidasRAM/${sessionStorage.ID_TOTEM}`
  );
  tempoRealRAM = await tempoRealRAM.json();
  for (let i = 0; i < 7; i++) {
    myChartMemoria.data.labels.shift();
    myChartMemoria.data.datasets[0].data.shift();
  }
  for (let i = 6; i >= 0; i--) {
    let time = `${tempoRealRAM[i].hora}:${tempoRealRAM[i].minuto}:${tempoRealRAM[i].segundo}`;
    myChartMemoria.data.labels.push(time);
    myChartMemoria.data.datasets[0].data.push(
      parseFloat(tempoRealRAM[i].consumo)
    );
    myChartMemoria.update();
  }
}

async function get_dataCPU() {
  var tempoRealCPU = await fetch(
    `/dashboard/buscarMedidasCPU/${sessionStorage.ID_TOTEM}`
  );
  tempoRealCPU = await tempoRealCPU.json();
  for (let i = 0; i < 7; i++) {
    myChartCpu.data.labels.shift();
    myChartCpu.data.datasets[0].data.shift();
  }
  for (let i = 6; i >= 0; i--) {
    let time = `${tempoRealCPU[i].hora}:${tempoRealCPU[i].minuto}:${tempoRealCPU[i].segundo}`;
    myChartCpu.data.labels.push(time);
    myChartCpu.data.datasets[0].data.push(parseFloat(tempoRealCPU[i].consumo));
    myChartCpu.update();
  }
}

/* ------------------------------VERIFICAR INCIDENTES--------------------------- */
function verificarIncidentes() {
  if (houveIncidentes) {
    contadorIncidentes++;
    document.getElementById("contadorIncidentes").innerHTML =
      contadorIncidentes;
  }
  houveIncidentes = false;
}
/*------------------------------------------------------------------------------ */

setInterval(() => {
  get_dataCPUKPI();
  get_dataRAMKPI();
  get_dataRAM();
  get_dataCPU();
}, 3000);

setInterval(() => {
  verificarIncidentes();
}, 10000);

setInterval(() => {
  get_dataDisco();
}, 10000);

get_dataDisco();

/*--DASHBOARD CHART JS STATIC--*/

/* --------DASHBOARD MEMORIA RAM--------*/
// var myChartMemoria = new Chart(memoria, {
//   type: "line",
//   data: {
//     labels: [
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//     ],
//     datasets: [
//       {
//         label: "Consumo de RAM no servidor",
//         data: [70, 40, 50, 24, 44, 30, 90],
//         backgroundColor: gradientBg,
//         borderColor: ["#2a84fe"],
//         borderWidth: 1,
//         radius: 3,
//         fill: true,
// tension: 0,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: true,
//     aspectRatio: 2,
//     onResize: null,
//     resizeDelay: 0,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//             max: 100,
//             min: 0,
//           },
//         },
//       ],
//     },
//     interaction: {
//       intersect: false,
//     },
//     plugins: {
//       legend: false,
//       tooltip: {
//         yAlign: "bottom",
//       },
//     },
//   },
// });

/* --------DASHBOARD CPU--------*/
// var myChartCpu = new Chart(cpu, {
//   type: "line",
//   data: {
//     labels: [
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//       "00:00:00",
//     ],
//     datasets: [
//       {
//         label: "Consumo de CPU no servidor",
//         data: [70, 40, 90, 24, 44, 30, 68],
//         backgroundColor: gradientBg2,
//         borderColor: ["#fa1e4e"],
//         borderWidth: 1,
//         radius: 3,
//         fill: true,
// tension: 0,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: true,
//     aspectRatio: 2,
//     onResize: null,
//     resizeDelay: 0,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//             max: 100,
//             min: 0,
//           },
//         },
//       ],
//     },
//     interaction: {
//       intersect: false,
//     },
//     plugins: {
//       legend: false,
//       tooltip: {
//         yAlign: "bottom",
//       },
//     },
//   },
// });
