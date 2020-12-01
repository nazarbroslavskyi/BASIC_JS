// Clock
// Write a JS class with two methods run and stop.
// First methods starts displaying current time in console in format ‘hh:mm:ss’
// every second starting from now. Second method stops it. In order to complete the task,
// you should create a class with methods in ES5 style.

// const clock = new Clock(); 
// clock.run();

// → 
// 19:55:11 
// 19:55:12 
// 19:55:13 
// … 

// clock.stop(); 
// → timer stops

Clock.prototype.run = function() {
  this.setTimeoutId = setInterval(() => console.log(new Date().toLocaleTimeString({}, { hour12: false })),1000)
}

Clock.prototype.stop = function() {
  clearTimeout(this.setTimeoutId);
  console.log('timer stops')
}

function Clock() {}

const clock = new Clock();

// For testing

// clock.run();

// setTimeout(() => clock.stop(), 5000);


