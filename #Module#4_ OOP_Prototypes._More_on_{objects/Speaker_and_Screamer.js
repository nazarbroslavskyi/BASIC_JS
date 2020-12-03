// Speaker and Screamer

// Write two classes, which are called Speaker and Screamer.
// Speaker is a simple type that exposes a speak method which,
//   when called, logs the given text along with the speaker's name.
// Shouter is a subtype of Speaker which shouts its text and makes it uppercase.
// You will need to complete this task in ES5 first and then rewrite in ES6.

// ES5

function Speaker(name) {
  this.name = name;
}

Speaker.prototype.speak = function (sentence, action = 'says') {
  console.log(`${this.name} ${action} ${sentence}`);
}


function Screamer(name) {
  Speaker.call(this, name);
}

Screamer.prototype = Object.create(Speaker.prototype);
Screamer.prototype.speak = function(sentence) {
  const bindedSpeakerMethod = Speaker.prototype.speak.bind(this);
  bindedSpeakerMethod(sentence.toUpperCase(), 'shouts')
}

// new Speaker("Mr. Calm").speak("easy, man"); // Mr. Calm says easy, man
// new Screamer("Mr. Loud").speak("hell yeah"); // Mr. Loud shouts HELL YEAH

// ES6

class Speaker {
  constructor(name) {
    this.name = name;
    this.action = 'says';
  }

  speak(sentence) {
    console.log(`${this.name} ${action} ${sentence}`);
  }
}

class Screamer extends Speaker {
  constructor(name) {
    super(name);
    this.action = 'shouts';
  }

  speak(sentence) {
    super.speak(sentence.toUpperCase(), 'shouts')
  }
}

// new Speaker("Mr. Calm").speak("easy, man"); // Mr. Calm says easy, man
// new Screamer("Mr. Loud").speak("hell yeah"); // Mr. Loud shouts HELL YEAH