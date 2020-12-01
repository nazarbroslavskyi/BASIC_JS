// Groups

// Write a class called Group, which has add, delete and has methods.Its constructor creates an empty group,
//   add adds a value to the group(but only if it isn’t already a member), delete removes its argument from the
// group(if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.
// Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.
// Give the class a static from method that takes an iterable object as argument and creates a group that contains
// all the values produced by iterating over it.
// Here you may use ES6 syntax.

class Group {
  group = [];

  add(newElement) {
    this.group.indexOf(newElement) === -1 ? this.group.push(newElement) : null;
  }

  delete(elem) {
    this.group = this.group.filter(el => !(elem === el));
  }

  has(searchElement) {
    return this.group.indexOf(searchElement) !== -1 ? true : false;
  }

  static from(data) {
    const group = new Group();

    for (let el of data) {
      group.group.push(el);
    }
    
    return group;
  }
}

let group = Group.from([10, 20]); 
console.log(group.has(10)); // → true 
console.log(group.has(30)); // → false 
group.add(10); 
group.delete(10); 
console.log(group.has(10)); // → false 
