// Write a helper function that takes a generator function and invokes it step by step

// const asyncTask1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('first resolved'), 1000)); 
// const asyncTask2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('second resolved'), 1000)); 
// const asyncTask3 = () => new Promise((resolve, reject) => setTimeout(() => reject('third rejected'), 1000)); 
// console.log('invoke helper') 



function helper(generatorFunc) {
  const generatorObj = generatorFunc();

  function iterate(iteratorObj) {
    if (iteratorObj.done) return iteratorObj.value;
    
    return iteratorObj.value.then(value => iterate(generatorObj.next(value)), err => console.log(err) );
  }

  return iterate(generatorObj.next());
}


// helper(function* main() { 
//  try { 
//    const a = yield asyncTask1(); 
//    console.log(a); 
//    const b = yield asyncTask2(); 
//    console.log(b); 
//    const c = yield asyncTask3(); 
//  } catch(e) { 
//    console.error('error happened', e); 
//  } 
// }); 

// → ‘invoke helper’ 
// 1000ms after helper invoked → ‘first resolved’ 
// 2000ms after helper invoked → ‘second resolved’ 
// 3000ms after helper invoked → ‘error happened third rejected’ 


