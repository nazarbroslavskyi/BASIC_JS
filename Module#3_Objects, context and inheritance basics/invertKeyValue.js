function invertKeyValue(obj) {
  const invertedObjectEntries = Object.entries(obj).map(([elemOne, elemTwo]) => [elemTwo, elemOne]);

  return Object.fromEntries(invertedObjectEntries);
}



console.log(invertKeyValue({ red: "#FF0000", green: "#00FF00", white: "#FFFFFF" }));
// → {"#FF0000":"red","#00FF00":"green","#FFFFFF":"white"}