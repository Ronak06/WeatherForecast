export function convertCtoF(num) {
  let newNum = parseFloat((num * 9) / 5 + 32).toFixed(0);

  return newNum;
}

export function convertFtoC(num) {
  let newNum = parseFloat(((num - 32) * 5) / 9).toFixed(0);

  return newNum;
}
