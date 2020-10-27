// Create array with all possible pairs of two arrays
// Write a JavaScript program to create a new array out of the two supplied by creating each possible pair from the arrays.

function getArrayElementsPairs(firstArr, secondArr) {
  const result = [];
  for(let i of firstArr) {
    for(let j of secondArr) {
      result.push([i, j])
    }
  }
  
  return result;
}

console.log(getArrayElementsPairs([1, 2], ['a', 'b']));
