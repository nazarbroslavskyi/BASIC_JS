// Filter out the non-unique values in an array
// Write a function to filter out non-unique values in an array.

function filterNonUnique(arr) {
  return arr.filter((el, index) => index === arr.lastIndexOf(el) && index === arr.indexOf(el));
}

console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // Output: [1,3,5] 
console.log(filterNonUnique([1, 2, 3, 4])); // Output: [1,2,3,4]
