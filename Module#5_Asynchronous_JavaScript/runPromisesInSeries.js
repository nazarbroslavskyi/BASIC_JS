// Array of promises in series
// Write a function to run an given array of promises in series, without using async/await syntax

// function delay(delay) {                    // this function only for testing
//   return new Promise((resolve) => {   
//     setTimeout(() => {                        
//       resolve();  
//     }, delay)
//   })
// }

function runPromisesInSeries(arr) {
  let promise = Promise.resolve();
  for (let i = 0; i < arr.length; i++) {
    promise = promise.then(_ => arr[i]())
  }
}

// runPromisesInSeries([ 
//   () => delay(1000).then(() => { 
//     console.log('message in 1 second') 
//   }), 
//   () => delay(2000).then(() => { 
//     console.log('message in 3 seconds') 
//   }) 
// ]); 