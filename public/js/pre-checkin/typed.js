const typedElement = document.getElementById('typed');

var typed = new Typed(typedElement, {
  strings: [
    'Olá, boas-vindas ao nosso pré check-in!',
    'Para começar, preencha os campos abaixo com seus dados pessoais.',
  ],
  stringsElement: null,
  typeSpeed: 30,
  onComplete: () => {
    clearText(typedElement);
  },
});

function clearText(textArea) {
  setTimeout(() => {
    textArea.innerHTML = '';
  }, 2000);
}
