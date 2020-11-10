// Write a factorial function that takes a positive integer
//  N as a parameter and prints the result of N! (factorial).

function factorial(number) {
  return number ? factorial(number - 1) * number : 1;
}

//console.log(factorial(0)) // 1 
//console.log(factorial(1)) // 1 
//console.log(factorial(5)) // 120 