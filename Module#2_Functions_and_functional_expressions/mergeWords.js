// Currying
// Write a function that merges words into sentence

function mergeWords(strOne) {
  let result = `${strOne}`;
  return function innerFunc(numberTwo) {
    if (arguments.length === 0) {
      return result;
    } else {
      result += ` ${numberTwo}`;
      return innerFunc;
    }
  }
}

console.log(mergeWords('GNU')('is')('not')('Unix.')()); // Output: ‘GNU is not Unix.’ 
