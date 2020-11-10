// Every/Some
//
// Write a JavaScript function that takes a list of valid users,
// and returns a function that returns true if all of the supplied
// users exist in the original list of users. You need to check only user ids,
// no need to check objects in depth

function checkUsersValid(validList) {
  return function (supliedList) {
    const result = supliedList.map(el => {

      return validList.some(item => (item.id === el.id) && item.hasOwnProperty('id') && el.hasOwnProperty('id'));
    })

    return result.every(item => item === true) ? true : false;
  }
}

// let goodUsers = [ 
//   { id: 1 }, 
//   { id: 2 }, 
//   { id: 3 } 
// ] 
// `checkUsersValid` is the function you'll define 

// let testAllValid = checkUsersValid(goodUsers) 
// testAllValid([ 
//   { id: 2 }, 
//   { id: 1 } 
// ]) 
// Output: true 

// testAllValid([ 
//   { id: 2 }, 
//   { id: 4 }, 
//   { id: 1 } 
// ]) 
// Output: false 
