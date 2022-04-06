const score = document.querySelector(".score");
let timer = document.querySelector(".timer");
const startButton = document.querySelector(".start-btn");
const soilImage = document.querySelectorAll(".soil");

let counter = 0;
let time = 30;
let mole; //image has src of mole
let soil; //image has src of soil
let click = false;

//random number is changed to mole image
const changeToMole = () => {
  let random = Math.floor(Math.random() * 6);
  soilImage[random].src = "css/img/mole.jpg";
  mole = soilImage[random].src;
  click = false;
};
changeToMole();

//Mole image changing to soil image back
const changeToSoil = () => {
  for (let i = 0; i < soilImage.length; i++) {
    soilImage[i].src = "css/img/soil.png";
    soil = soilImage[i].src;
  }
};
changeToSoil();

//time counting
const timeCount = () => {
  time--;
  timer.textContent = `TIME: ${time}`;
};

//score counting
const scoreCount = () => {
  counter++;
  score.textContent = `SCORE: ${counter}`;
};

//Mole hitting activated and counter updates.Several hits in a raw on same mole is restricted.
soilImage.forEach((image) => {
  image.addEventListener("click", () => {
    if (image.src === mole && click === false) {
      scoreCount();
      image.src = soil;
      click = true;
      if (image.src === mole && click === true) {
        return;
      }
    }
  });
});

//Running and resetting intervals for the time count and the image src changes.
const timersStart = () => {
  let resetTime = setInterval(() => {
    timeCount();
    if (time === 0) {
      clearInterval(resetTime);
    }
  }, 900);
  let stopMoleImg = setInterval(() => {
    changeToMole();
    if (time === 0) {
      clearInterval(stopMoleImg);
    }
  }, 700);
  let resetMole = setInterval(() => {
    changeToSoil();
    if (time === 0) {
      clearInterval(resetMole);
    }
  }, 1800);
};
//Start game function, resets and run counters, images start changing.
const startGame = () => {
  time = 20;
  counter = 0;
  changeToMole();
  changeToSoil();
  timersStart();
};
//Clicked button starts game
startButton.addEventListener("click", startGame);
