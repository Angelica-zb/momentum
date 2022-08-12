//-------------------translation
let langSelect = 'en';
import { library } from './list.js';
const ru = document.querySelector('.ru');
const en = document.querySelector('.en');

ru.addEventListener('click', function() {
    langSelect = 'ru';
    showDate();
    showGreeting();
    getWeather();
    changeQuotes()
    translatSettings()

})

en.addEventListener('click', function() {
    langSelect = 'en';
    showDate();
    showGreeting();
    getWeather();
    changeQuotes()
    translatSettings()

})

const settingsH3 = document.querySelector('.settings-h3');
const chooseLangP = document.querySelector('.choose-lang-p');
const chooseImgP = document.querySelector('.choose-img-p');
const chooseTagP = document.querySelector('.choose-tag-p');
const tagChange = document.querySelector('.tag-change');
const blocksText = document.querySelector('.blocks-text');
const hideTime = document.querySelector('.hide-time');
const hideDate = document.querySelector('.hide-date');
const hideGreeting = document.querySelector('.hide-greeting');
const hideQuote = document.querySelector('.hide-quote');
const hideWheather = document.querySelector('.hide-weather');
const hidePlayer = document.querySelector('.hide-audio');
const hideTodolist = document.querySelector('.hide-todolist');

function translatSettings() {
    settingsH3.textContent = library.settingsH3[langSelect]
    chooseLangP.textContent = library.chooseLangP[langSelect]
    chooseImgP.textContent = library.chooseImgP[langSelect]
    chooseTagP.textContent = library.chooseTagP[langSelect]
    tagChange.textContent = library.tagChange[langSelect]
    blocksText.textContent = library.blocksText[langSelect]
    hideTime.textContent = library.hideTime[langSelect]
    hideDate.textContent = library.hideDate[langSelect]
    hideGreeting.textContent = library.hideGreeting[langSelect]
    hideQuote.textContent = library.hideQuote[langSelect]
    hideWheather.textContent = library.hideWheather[langSelect]
    hidePlayer.textContent = library.hidePlayer[langSelect]
    hideTodolist.textContent = library.hideTodolist[langSelect]
}

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

//------------time ------------date
function showTime() {
    let timeScrin = new Date().toLocaleTimeString();
    time.textContent = timeScrin;
    showDate();
    getTimeOfDay();
    showGreeting()
    getTimeOfDayLang()
    setTimeout(showTime, 1000);
}
showTime();

function showDate() {
    let dateW = new Date().toLocaleDateString(`${langSelect}-En`, options);
    dateScrin.textContent = dateW;
}

//-----------------greeting  
function getTimeOfDayLang() {
    let hoursNow = new Date().getHours();
    if (hoursNow < 6) {
        return library.night[langSelect]
    } else if (hoursNow < 12) {
        return library.morning[langSelect]
    } else if (hoursNow < 18) {
        return library.afternoon[langSelect]
    } else if (hoursNow < 24) {
        return library.evening[langSelect]
    }
}

function getTimeOfDay() {
    let timeOfDay = '';
    let hoursNow = new Date().getHours();
    const timeOfDayArr = ['night', 'morning', 'afternoon', 'evening'];
    let a = Math.floor(hoursNow / 6);
    timeOfDay = timeOfDayArr[a];
    return timeOfDay
}

function showGreeting() {
    let timeOfDay = getTimeOfDayLang();
    nameGret.placeholder = `${library.greetingPlace[langSelect]}`;
    greeting.textContent = `${library.greeting[langSelect]}${timeOfDay}`;
    //setTimeout(getTimeOfDay, 1000);
}
showGreeting()

//--------------------------LocalStorage 
function setLocalStorage() {

    localStorage.setItem('name', nameGret.value);
    localStorage.setItem('city', cityWeath.value);
    localStorage.setItem('language', langSelect);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {

    if (localStorage.getItem('name')) {
        nameGret.value = localStorage.getItem('name');
    }
    langSelect = localStorage.getItem('language')
    cityWeath.value = localStorage.getItem('city') || (`${library.cityMinsk[langSelect]}`);

    getCheckedCheck();
    getWeather()
    changeQuotes()
    translatSettings()
}

window.addEventListener('load', getLocalStorage)

//------------------slider
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

//------------------------weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const cityWeath = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error')
city.addEventListener('change', getWeather);

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langSelect}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    city.placeholder = `${library.cityPlace[langSelect]}`;
    //weatherError.textContent = `Error! ${data.message} for '${city.value}'!`
    weatherError.textContent = `${library.errorWeather[langSelect]} '${city.value}'!`
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    if (data.message == undefined) {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${library.wind[langSelect]}: ${data.wind.speed.toFixed(0)} ${library.windSpeed[langSelect]}`;
        humidity.textContent = `${library.humidity[langSelect]}: ${data.main.humidity.toFixed(0)}%`;
        weatherError.textContent = ''

    }
};

//--------------------------Quotes
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const butQuote = document.querySelector('.change-quote');

async function changeQuotes() {
    const quotes = langSelect === 'en' ? './js/data.json' : './js/dataRu.json';
    const res = await fetch(quotes);
    const data = await res.json();

    let n = Math.floor(Math.random() * 19);
    let text = document.getElementsByClassName('quote')[0].textContent;
    if (text == (`"${data[n].text}."`)) {
        if (n < 10) { n = n + 1 } else { n = n - 1 }
        quote.textContent = `"${data[n].text}."`
        author.textContent = `${data[n].author}`
    } else {
        quote.textContent = `"${data[n].text}."`
        author.textContent = `${data[n].author}`
    }
}
changeQuotes()
butQuote.addEventListener('click', changeQuotes);

//------------------player
const playPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next ');
const ulPlayList = document.querySelector('.play-list');
//player-custom
const current = document.querySelector('.current');
const nameSong = document.querySelector('.name-song');
const lengthSong = document.querySelector('.length-song');
//
let isPlay = false;
let playNum = 0

import { playList } from './list.js';
playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    ulPlayList.append(li)
})

const playItems = document.querySelectorAll('.play-item');
//player-custom
nameSong.textContent = playList[playNum].title;
lengthSong.textContent = playList[playNum].duration;
//
const audio = new Audio();

function playAudio() {
    let currentSong = audio.currentTime; //player-custom
    audio.src = playList[playNum].src;
    if (!isPlay) {
        playItems[playNum].classList.add('item-active');
        nameSong.textContent = playList[playNum].title; //player-custom
        lengthSong.textContent = playList[playNum].duration; //player-custom
        audio.currentTime = currentSong; //player-custom
        audio.play();
        isPlay = true;
    } else {
        audio.currentTime = currentSong; //player-custom
        playItems[playNum].classList.remove('item-active'); //player-custom
        audio.pause();
        isPlay = false;
    }
    audio.addEventListener('ended', playNextAudio);
}

function pauseAudio() {
    play.classList.toggle('pause');
}

play.addEventListener('click', function(p) {
    playAudio()
    pauseAudio();
})

function playNextAudio() {
    audio.currentTime = 0;
    play.classList.add('pause');
    isPlay = false;
    playItems[playNum].classList.remove('item-active');
    if (playNum < playList.length - 1) {
        playNum++
    } else {
        playNum = 0
    }
    playAudio()
}

function playPrevAudio() {
    audio.currentTime = 0;
    play.classList.add('pause');
    playItems[playNum].classList.remove('item-active');
    isPlay = false;
    if (playNum > 0) {
        playNum--
    } else {
        playNum = (playList.length - 1)
    }
    playAudio()
}
playNext.addEventListener('click', playNextAudio);
playPrev.addEventListener('click', playPrevAudio);

//-----------player custom---------------
const player = document.querySelectorAll('.player');
const timeline = document.querySelector(".timeline");

//timeline
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
});

setInterval(() => {
    const progressBar = document.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    current.textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}, 500);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

//control song
if (playItems.length > 0) {
    for (let i = 0; i < playItems.length; i++) {
        const playItem = playItems[i];
        playItem.addEventListener("click", function(a) {
            //let currentSong = audio.currentTime;
            if (playNum != i) {
                let currentSong = 0;
                audio.pause();
                playItems[playNum].classList.remove('item-active');
                play.classList.add('pause');
                playNum = i;
                audio.src = playList[playNum].src;
                playItems[playNum].classList.add('item-active');
                nameSong.textContent = playList[playNum].title;
                lengthSong.textContent = playList[playNum].duration;
                audio.currentTime = currentSong;
                audio.play();
                isPlay = true;
            } else {
                pauseAudio();
                playItems[playNum].classList.remove('item-active');
                playNum = i;
                playAudio()
            }
            audio.addEventListener('ended', playNextAudio);
        })
    }
}

//volume
document.querySelector(".volume-percentage").style.width = '75%';
const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
})

document.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = document.querySelector(".volume-button");
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.style.opacity = 0.4;
    } else {
        volumeEl.style.opacity = 1;
    }
});

//----------------settings
//menu
const settingsAll = document.querySelectorAll('.settings-menu, .cross, .bg-settings')
if (settingsAll.length > 0) {
    for (let index = 0; index < settingsAll.length; index++) {
        const setting = settingsAll[index];
        const settingsMenu = document.querySelector('.settings-menu')
        const settings = document.querySelector('.settings');
        const bgSettings = document.querySelector('.bg-settings')
        setting.addEventListener("click", function(e) {
            settings.classList.toggle('hidden');
            settingsMenu.classList.toggle('hidden-icon');
            bgSettings.classList.toggle('bg-settings-active');
        });
    }
};

//hidden block
let hideBlocks = document.querySelectorAll('.hide-time, .hide-date, .hide-greeting, .hide-quote, .hide-weather, .hide-audio, .hide-todolist')

if (hideBlocks.length > 0) {
    for (let index = 0; index < hideBlocks.length; index++) {
        let hideBlock = hideBlocks[index];

        hideBlock.addEventListener("click", function(e) {
            setTimeout(function() {
                getCheckedCheck()
            }, 50)

        });
    }
}

function getCheckedCheck() {
    const checkboxes = document.getElementsByClassName('checkbox');
    for (var index = 0; index < checkboxes.length; index++) {
        let l = document.querySelectorAll(`.${checkboxes[index].value}`)
        if (checkboxes[index].checked) {
            if (l.length > 0) {
                for (let index = 0; index < l.length; index++) {
                    let m = l[index]
                    m.classList.add('hidden-block')
                }
            }
        } else {
            if (l.length > 0) {
                for (let index = 0; index < l.length; index++) {
                    let m = l[index]
                    m.classList.remove('hidden-block')
                }
            }
        }
    }
}

document.querySelectorAll(".checkbox").forEach(el => {
    el.onchange = () => localStorage.setItem(el.id, el.checked);
    el.checked = localStorage.getItem(el.id) === "true";
})