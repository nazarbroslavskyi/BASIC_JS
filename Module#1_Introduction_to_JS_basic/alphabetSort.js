// Sort string in alphabetical order
// Write a function to convert the letters of a given string in alphabetical order.

function alphabetSort(string) {
  return string.split('').sort().join('');
}

console.log(alphabetSort("Python")); // Output: ‘Phnoty’