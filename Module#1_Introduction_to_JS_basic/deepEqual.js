// deepEqual
// Write a function deepEqual that takes two values and returns true only if they
//  are the same value or are objects with the same properties, 
// where the values of the properties are equal when compared with a recursive call to deepEqual


function deepEqual(firstObject, secondObject) {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  for (const key of firstKeys) {
    const val1 = firstObject[key];
    const val2 = secondObject[key];
    const areObjects = val1 != null && typeof val1 === 'object' && val2 != null && typeof val2 === 'object';
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

let obj = {here: {is: "an"}, object: 2}; 
console.log(deepEqual(obj, obj)); // Output: true 
console.log(deepEqual(obj, {here: 1, object: 2})); // Output: false 
console.log(deepEqual(obj, {here: {is: "an"}, object: 2})); // Output: true 