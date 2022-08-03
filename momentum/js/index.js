//time date
const time = document.querySelector('.time');
const date = new Date();
const currentTime = date.toLocaleTimeString();
const dateScrin = document.querySelector('.date');
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const currentDate = date.toLocaleDateString('en-En', options);

//greeting
const nameGret = document.querySelector('.name');
const greeting = document.querySelector('.greeting');
const hours = date.getHours();

//slider
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum = +getRandomNum();

function showTime() {
    let timeScrin = new Date().toLocaleTimeString();
    time.textContent = timeScrin;
    showDate();
    getTimeOfDay()

    setTimeout(showTime, 1000);
}
showTime();

function showDate() {
    let dateW = new Date().toLocaleDateString('en-En', options);
    dateScrin.textContent = dateW;
}

//greeting
function getTimeOfDay() {
    let timeOfDay = '';
    let hoursNow = new Date().getHours();
    const timeOfDayArr = ['morning', 'day', 'evening', 'night'];
    let a = Math.floor(hoursNow / 6);
    if (hoursNow == 0) {
        timeOfDay = timeOfDayArr[0]
    } else { timeOfDay = timeOfDayArr[a - 1]; }
    return timeOfDay
}
const timeOfDay = getTimeOfDay();
greeting.textContent = `Good ${timeOfDay}`;


function setLocalStorage() {
    localStorage.setItem('name', nameGret.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameGret.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

//slider
function getRandomNum() {
    let ranNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

    return String(ranNum)
}

function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = (getRandomNum()).padStart(2, '0')

    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;

}
setBg()

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

function getSlideNext() {
    let timeOfDay = getTimeOfDay();
    if (randomNum < 20) {
        randomNum++
    } else { randomNum = 1 }
    randomNum = (String(randomNum)).padStart(2, '0')
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
}

function getSlidePrev() {
    let timeOfDay = getTimeOfDay();
    if (randomNum > 1) {
        randomNum--
    } else { randomNum = 20 }
    randomNum = (String(randomNum)).padStart(2, '0')
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
}


// console.log(b)