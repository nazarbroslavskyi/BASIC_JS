// (optional) Implement Array reduce function. For simplicity, your implementation of reduce doesn't need
// to replicate the behaviour of a reduce missing an initial value.
// You may assume the initial value will always be supplied.


function reduce(arr, func, initialValue) {
  let accum = initialValue;

  for (let i = 0; i < arr.length; i++) {
    accum = func(accum, arr[i], i, arr);
  }

  return accum;
}

// console.log(
//   reduce(
//     [1, 2, 3],
//     function(prev, curr, index, arr) {
//       return prev * curr;
//     },
//     1
//   )
// );  // Output: 6 
