// Fibonacci
// Write a generator function that returns fibonacci sequence

function* fibonacci(n) {
  if(n === 1) {
    yield 0;
    return;
  } else if( n <= 0 || n === undefined) {
    return;
  }
  let a = 0;
  let b = 1;
  yield a;
  yield b;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    yield c;
    a = b;
    b = c;
  }
}


let [...first10] = fibonacci(10); 
console.log(first10); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// As I understood numeration starts from zero
// and I have added this tricky checking

  // if(n === 1) {
  //   yield 0;
  //   return;
  // } else if( n <= 0 || n === undefined) {
  //   return;
  // }
