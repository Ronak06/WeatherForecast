export function convertCtoF(num) {
  let newNum = Math.round(parseFloat((num * 9) / 5 + 32).toFixed(1));
  return newNum;
}

export function convertFtoC(num) {
  let newNum = Math.round(parseFloat(((num - 32) * 5) / 9).toFixed(1));
  return newNum;
}
