// Showing the width and height of a window
// Write a program to get the width and height of the window
// (any time the window is resized) and display them in
// paragraphs on the page.Getting window size on resize should be throttled.

const heightOutput = document.querySelector('#height');
const widthOutput = document.querySelector('#width');

heightOutput.textContent = window.innerHeight;
widthOutput.textContent = window.innerWidth;

const widthAndHeight = throttle(getWidthAndHeightOfWindow, 500);

window.addEventListener("resize", widthAndHeight);

function getWidthAndHeightOfWindow() {
  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;
}

function throttle(func, time) {
  let throttle;

  return function () {
    const args = arguments;
    const context = this;
    if (!throttle) {
      func.apply(context, args);
      throttle = true;
      setTimeout(() => (throttle = false), time);
    }
  };
};