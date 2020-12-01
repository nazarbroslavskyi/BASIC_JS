console.log(Object.getOwnPropertyNames(Math).filter(function (p) {
  return typeof Math[p] === 'function';
}));