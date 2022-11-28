export default function validRG(input) {
  const rg = input.replace(/\.|-/g, '');
  validateNumbersRepeated(rg);
}

function validateNumbersRepeated(rg) {
  const numbersRepeated = [
    '000000000',
    '111111111',
    '222222222',
    '333333333',
    '444444444',
    '555555555',
    '666666666',
    '777777777',
    '888888888',
    '999999999',
  ];

  return numbersRepeated.includes(rg);
}
