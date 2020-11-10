// Write a function using recursion that takes a function as its first argument,
// a number num as its second argument, then executes the passed in function num times.


function log(message) {
  console.log(message);
}

function repeat(func, number) {
  if(number > 0) {
  	number = number - 1;
    func('Wassup')
    repeat(func, number);
  }
}

// repeat(console.log('Wassup'), 5); // Function should output ‘Wassup’ 5 times 