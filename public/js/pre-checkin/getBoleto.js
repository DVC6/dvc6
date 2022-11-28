const btnFechar = document.querySelector('.btn_fechar');

async function getBoleto() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  };

  const response = await fetch('/pre-checkin/finalizacao', options);
  if (response.status === 200) {
    window.location.href = '/pre-checkin/finalizacao';

    return;
  }
}

setTimeout(() => {
  getBoleto();
}, 2000);

btnFechar.addEventListener('click', () => {
  window.location.href = '../../pages/pre-checkin/preCheckin.html';
});
