    // CONTADOR SERVIDORES ATIVOS/////////
    const date = new Date();
    var dataAtual = date.getDate();
    var contadorTotens = 0;
    var contadorAcimaRAM = 0;
    var contadorAcimaCPU = 0;

    function atualizarTotens(idHospital) {
        var idHospital = sessionStorage.ID_HOSPITAL;
        fetch(`/dashboard/listarTotens/${idHospital}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("lista_totens");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado."
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("lista_totens");
                    feed.innerHTML = "";

                        // Gerando lista
                    for (var i = 0; i < resposta.length; i++) {
                        var totem = resposta[i];

                        // criando e manipulando elementos do HTML
                        var divTotem = document.createElement("div");
                        var spanID = document.createElement("span");
                        var spanTitulo = document.createElement("span");
                        var divButtons = document.createElement("div");

                        spanID.innerHTML = totem.idTotem + "<br>";
                        spanTitulo.innerHTML = totem.nome_maquina + "<br>";
                        divButtons.innerHTML = "Detalhes";


                        // adicionando propriedades para CSS
                        divTotem.className = "publicacao";
                        divTotem.id = "divTotem" + totem.idTotem;
                        spanTitulo.id = "inputNumero" + totem.idTotem;
                        spanTitulo.className = "publicacao-titulo";

                        divButtons.className = "div-buttons";
                        divButtons.id = totem.idTotem + "," + totem.nome_maquina;


                        divTotem.appendChild(spanID);
                        divTotem.appendChild(spanTitulo);
                        divTotem.appendChild(divButtons);
                        feed.appendChild(divTotem);

                        divButtons.addEventListener("click", carregarDashboard);

                        verificarTotensEmRisco(totem.idTotem);
                        // Acionar contador de totens logados
                        var ultimaData;
                        pegarUltimaData(totem.idTotem).then((resposta) => {
                            ultimaData = resposta;
                            if (ultimaData == dataAtual) {
                                contadorTotens++;
                                document.getElementById("totensAtivos").innerHTML = contadorTotens;
                            }
                        });
                    }
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

    }

    function carregarDashboard() {
        var dadoTotem = this.id.split(",");
        var idTotem = dadoTotem[0];
        var nome_maquina = dadoTotem[1];
        sessionStorage.ID_TOTEM = idTotem;
        sessionStorage.NOME_TOTEM = nome_maquina;
        window.location = "./DashboardTotem.html";
    }

    async function verificarTotensEmRisco(idTotem) {
        var ultimosDados = await fetch(`/dashboard/buscarTotensEmRisco/${idTotem}`);
        if (ultimosDados.status === 200) {
            ultimosDados = await ultimosDados.json();
            var ultimoDadoCPU = ultimosDados.percentualCPU;
            var ultimoDadoRAM = ultimosDados.percentualRAM;

            if (ultimoDadoRAM >= 80) {
                contadorAcimaRAM++;
                porcentagemServidoresRAM = (contadorAcimaRAM * 100) / contadorTotens;
                document.getElementById("spanRAM").innerHTML = porcentagemServidoresRAM.toFixed(2) + "%";
            }

            if(ultimoDadoRAM >= 90 || ultimoDadoCPU >= 90){
                document.getElementById(`divTotem${idServidor}`).style.background = '#ec3434';
            } else if (ultimoDadoRAM >= 70 || ultimoDadoCPU >= 70){
                document.getElementById(`divTotem${idServidor}`).style.background = '#dfdf00';
            }
            
            if (ultimoDadoCPU >= 80) {
                contadorAcimaCPU++;
                porcentagemServidoresCPU = (contadorAcimaCPU * 100) / contadorTotens;
                document.getElementById("spanCPU").innerHTML = porcentagemServidoresCPU.toFixed(2) + "%";
            }
        }
    }

    async function pegarUltimaData(idTotem) {
        var ultimaData = await fetch(`/dashboard/buscarUltimaData/${idTotem}`);
        if (ultimaData.status === 200) {
            ultimaData = await ultimaData.json();
            var dataColetada = ultimaData[0].dia;
            return dataColetada;
        }
        return 0;
    }