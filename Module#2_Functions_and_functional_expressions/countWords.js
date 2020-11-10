// Reduce

// Write a function that returns an object which contains the
//  number of times each string occured in the array.

function countWords(arr) {
  return arr.reduce((accum, el, index, arr) => {
   accum[el] = arr.filter(item => item === el).length;

   return accum;
  }, {})
}

// const inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']; 
// countWords(inputWords);

// Output: { ‘Apple’: 2, ‘Banana’: 1, ‘Durian’: 3 } 
