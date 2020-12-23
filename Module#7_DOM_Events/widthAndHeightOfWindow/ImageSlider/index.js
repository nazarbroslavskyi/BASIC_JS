// Images slider
// Write a program that will let user to add images in slider.
// Slider should switch images when user clicks appropriate controls.
// Also images should be switched automatically in time that user sets.
// Manual switching of images drops the timer.
// When user double - clicks on image, system should ask for image deleting,
// and remove image from slider if user confirms that.After image has been removed,
// slider switches to the next image.

let slideArray = [
  `https://www.w3schools.com/images/tshirt.jpg`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPatI8L-7_C2UkVV0vkWgoMbg96WX1V4FGyA&usqp=CAU`,
  `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80`,
  `https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg`,
  `https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg`,
  `https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG`,
  `https://tinyjpg.com/images/social/website.jpg`,
];


for(let i of slideArray) {
  addImageToSlider(i)
}

// only to fill dummy content for testing

const addImageBtn = document.querySelector(".slider-options__add-img-btn");
const sliderContainer = document.querySelector('.slider-container');
const sliderOptionTimerContainer = document.querySelector('.slider-options__timer');
const timerValue = document.querySelector('.slider-options__timer-input');
const imageUrlInput = document.querySelector(".slider-options__add-img-input");

let position = 0;
let numberOfItems = 0;
let timeIntervalToSwitch = 1; 
let timerId = setIntervalToSwitchSlider(timeIntervalToSwitch);

timerValue.addEventListener('input', updateInterval);

function updateInterval() {
  let error;

  if(0 >= parseFloat(+this.value) && !sliderOptionTimerContainer.querySelector('.error')) {
    error = document.createElement('div');
    error.setAttribute("class", "error");
    error.innerHTML = 'Min value is 1 secund';
    sliderOptionTimerContainer.append(error);   
  } 
  
  if(parseFloat(+this.value) > 0) {
    timeIntervalToSwitch = this.value;
    clearInterval(timerId);
    timerId = setIntervalToSwitchSlider(timeIntervalToSwitch);
    sliderOptionTimerContainer.querySelector('.error') ? sliderOptionTimerContainer.querySelector('.error').remove() : null;
  }
}

addImageBtn.addEventListener('click', () => addImageToSlider(imageUrlInput.value));

function addImageToSlider(imageUrl) {
  loadImage(imageUrl).then(image => {
  image.setAttribute("class", "slider-image");
  document.querySelector('.slider-container').appendChild(image);
  image.addEventListener('dblclick', removeSlide);
  sliderContainer.style.transition = 'all 0.5s';
  sliderContainer.style.right = position + 'px';
  numberOfItems = sliderContainer.childElementCount;
  }).catch(err => (alert('Can not load image by this link. Please put another link')));
}

function removeSlide() {
  clearInterval(timerId);
  if(confirm('Are you sure you want to delete slide ?')) {
    timerId = setIntervalToSwitchSlider(timeIntervalToSwitch);
    this.remove();
    position -= sliderContainer.offsetWidth;
    sliderContainer.style.right = position + 'px';
    sliderContainer.style.transition = 'all 0.5s';
  } else {
    timerId = setIntervalToSwitchSlider(timeIntervalToSwitch);
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });

    image.addEventListener('error', (err) => {
      reject(err)
    });
    image.src = url;
  });
}

function setIntervalToSwitchSlider(time = 3) {
  let timerId = setInterval(() => {
    numberOfItems = sliderContainer.childElementCount;
    if(position < (numberOfItems - 1) * sliderContainer.offsetWidth) {
      position += sliderContainer.offsetWidth;
      sliderContainer.style.right = position + 'px';
      sliderContainer.style.transition = 'all 0.5s';
    }
  }, time * 1000);

  return timerId;
}

function prevSlide() {
  numberOfItems = sliderContainer.childElementCount;
  if(position > 0) {
    clearInterval(timerId);
    position -= sliderContainer.offsetWidth;
    sliderContainer.style.right = position + 'px';
    sliderContainer.style.transition = 'all 0.5s';
  }
}

function nextSlide(){
  numberOfItems = sliderContainer.childElementCount;

  if(position < (numberOfItems - 1) * sliderContainer.offsetWidth) {
    clearInterval(timerId);
    position += sliderContainer.offsetWidth;
    sliderContainer.style.right = position + 'px';
    sliderContainer.style.transition = 'all 0.5s';
    console.log((numberOfItems - 1) * sliderContainer.offsetWidth);
  }
}

sliderContainer.addEventListener('transitionend', () => {
  clearInterval(timerId);
  timerId = setIntervalToSwitchSlider(timeIntervalToSwitch);
});
