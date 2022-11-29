async function getHospitais() {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('/hospitais/listar', options);
    if (response.ok) {
      const hospitais = await response.json();
      const optionHospitais = document.getElementById(
        'select_hospitais_precheckin'
      );

      hospitais.map((hospital) => {
        const option = document.createElement('option');
        option.value = hospital.id_hospital;
        option.text = hospital.nome_fantasia;

        optionHospitais.append(option);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

getHospitais();
