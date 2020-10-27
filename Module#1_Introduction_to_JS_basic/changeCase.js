// Write a function to change the capitalization of all letters in a given string.

function changeCase(string) {
  let result = '';
  for(let i of string) {
    result += i.toLowerCase() === i ? i.toUpperCase(): i.toLowerCase();
  }
  return result;

}

// console.log(changeCase("21century")); // Output: 21CENTURY
// console.log(changeCase("Hybris")); // Output: hYBRIS