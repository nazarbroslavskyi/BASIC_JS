// Double every even integer
// Write function which gets array of integers and returns another array of integers where every even number is doubled

function doubleEveryEven(arr) {
  return arr.map(el => el % 2 === 0 ? el * 2 : el);
}

console.log(doubleEveryEven([2,0,7,3,8,4])); // Output: [4,0,7,3,16,8]