function getKeyValuePairs(data) {
  return Object.entries(data);
}

console.log(getKeyValuePairs({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"}));; 
// → [["red","#FF0000"],["green","#00FF00"],["white","#FFFFFF"]] 