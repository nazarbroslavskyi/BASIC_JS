function getSecondMiminum(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  
  return sortedArr[1] ? sortedArr[1] : 'The array has less than two elements';
}

console.log(getSecondMiminum([5, 0, 7, 3, 8])); // Output: 3