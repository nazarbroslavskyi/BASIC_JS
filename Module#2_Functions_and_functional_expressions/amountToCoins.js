// Write a function to convert an amount to coins

function amountToCoins(amountOfMoney, arrOfCoins) {
  const result = [];
  
    for (let i = 0; i < arrOfCoins.length; i++) {
      if (amountOfMoney - arrOfCoins[i] >= 0) {
        amountOfMoney = amountOfMoney - arrOfCoins[i];
        result.push(arrOfCoins[i]);
        i--;
      }
    }

  return result;
}

// console.log(amountToCoins(46, [25, 10, 5, 2, 1])); // Output: [25, 10, 10, 1] 