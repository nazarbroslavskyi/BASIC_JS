// Delay

// Write a function that returns a promise, which becomes resolved in some milliseconds
// delay(1000).then(() => console.log("Hey!")) // → ‘Hey!’ in 1 second 

function delay(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, delay)
  })
}

delay(1000).then(() => console.log("Hey!")) // → ‘Hey!’ in 1 second 