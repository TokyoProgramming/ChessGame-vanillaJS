const startingMinutes = 10;
let time = startingMinutes * 60;

/id = 'countdown' 10:00/;

const countDownEl = document.getElementById('coun');

const updateCountDown = () => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  countDownEl.innerHTML = `${minutes} : ${seconds}`;
  time--;
};
