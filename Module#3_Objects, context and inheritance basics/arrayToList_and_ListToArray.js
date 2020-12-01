function arrayToList(data) {
  if (Array.isArray(data)) {
    return data.reverse().reduce((rest, value) => ({ value, rest }), null);
  } else {
    throw new Error('No array passed')
  }
}

function listToArray(list) {
  const result = [];

  function isObject(list) {
    return typeof list === 'object'
      && typeof list !== 'null'
      && !Array.isArray(list)
  }

  function takeObjectRecursively(data) {
    for (let key in data) {
      if (isObject(data[key])) {
        takeObjectRecursively(data[key]);
      } else {
        result.push(data.value);
      }
    }
  }

  if (isObject(list)) {
    takeObjectRecursively(list);
    return result;
  } else {
    throw new Error('No object passed')
  }
}


// let array = [1, 2, 3]
// let list = {
//   value: 1,
//   rest: {
//     value: 2,
//     rest: {
//       value: 3,
//       rest: null
//     }
//   }
// };

// console.log(arrayToList([10, 20]))
// → {value: 10, rest: {value: 20, rest: null}} 

// console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30] 