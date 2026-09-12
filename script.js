if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    localStorage.removeItem('remainingTime');
    for (let i = 2; i <= 10; i++) {
        localStorage.removeItem(`page${i}Completed`);
    }
}

const pageMatch = window.location.pathname.match(/page(\d+)/);
const currentPage = pageMatch ? parseInt(pageMatch[1]) : null;

if (currentPage && currentPage > 2) {
    const previousPageKey = `page${currentPage - 1}Completed`;
    if (!localStorage.getItem(previousPageKey)) {
        window.location.href = `page${currentPage - 1}.html`;
    }
}

function completeChallenge() {
    if (currentPage) {
        const pageKey = `page${currentPage}Completed`;
        localStorage.setItem(pageKey, 'true');
        window.location.href = `page${currentPage + 1}.html`;
    }
}

const initialTime = 300;
let remainingTime = localStorage.getItem('remainingTime') ?
parseInt(localStorage.getItem('remainingTime')):initialTime
let interval = null;

function formatTime(seconds) {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds%60;

    const zeroPreSeconds = String(remainingSeconds).padStart(2, '0');
    return `${minutes}:${zeroPreSeconds}`;
}
function updateTimer() {
    const timerElement = document.querySelector('.timer');
    timerElement.textContent = formatTime(remainingTime);
}
function countdown() {
    remainingTime--;
    localStorage.setItem('remainingTime', remainingTime);
    updateTimer();

    if (remainingTime<=0){
        clearInterval(interval);
        timerDone();
    }
}
function startTimer() {
    if (interval) clearInterval(interval);
    updateTimer();
    interval = setInterval(countdown, 1000);
}

startTimer();

function timerDone() {
    alert("time's up! you didn't beat the clock");
    localStorage.removeItem(`page${currentPage}Completed`);
    window.location.href='index.html';
}

document.querySelectorAll(".color-element").forEach(element => {
    element.addEventListener('click', function() {
        this.style.zIndex = '-1';
        this.style.scale = '20000%';
        this.style.position = 'absolute';
        document.body.style.overflow = 'hidden';
    })
});

const enterButton = document.getElementById('enter-input')
if (enterButton) {
    const number1 = Math.floor(Math.random()*10);
    const number2 = Math.floor(Math.random()*10);
    const correctInput = String(number1)+String(number2);

    document.querySelectorAll('.hidden-number')[0].textContent=number1;
    document.querySelectorAll('.hidden-number')[1].textContent=number2;
    const input = document.querySelector('input[type="number"]');
    enterButton.addEventListener('click', function() {
        const userInput = input.value;
        if (userInput===correctInput) {
            completeChallenge();
        }
        else {
            alert('try again');
            input.value = '';
        }
    });
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            enterButton.click();
        }
    });
}

const wordSelection = ['TIMER','COUNTDOWN','HURRY','URGENCY','TICKING','PRESSURE','SECONDS']
function randomWord() {
    return wordSelection[Math.floor(Math.random()*wordSelection.length)];
}
function scramble(word) {
    let scrambled;
    do {
        scrambled = word.split('').sort(()=>Math.random()-0.5).join('');
    } while (scrambled === word);
    return scrambled;
}
const correctWord=randomWord();
const scrambledWord=scramble(correctWord);
const scrambledElement = document.getElementById('scrambled-word');
if (scrambledElement) {
    scrambledElement.textContent = scrambledWord;
}
const enterWord = document.getElementById('enter-word');
if (enterWord) {
    const inputElement = document.querySelector('input[type="text"]');
    enterWord.addEventListener('click', function() {
        const userInput = inputElement.value.toUpperCase();

        if (userInput===correctWord) {
            completeChallenge();
        }
        else {
            alert("incorrect");
        }
    });
    inputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            enterWord.click();
        }
    });
}

function hideWord(word,letterCount) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const randomBefore = Array.from({length: letterCount},() =>
    letters[Math.floor(Math.random()*letters.length)]).join('');
    const randomAfter = Array.from({length: letterCount},() =>
    letters[Math.floor(Math.random()*letters.length)]).join('');

    return `${randomBefore}<a href="#" id="hidden-word-link">${word}</a>${randomAfter}`;
}

const letterContainer = document.querySelector('#letter-container');
if (letterContainer) {
    letterContainer.innerHTML=hideWord('countdown',10000);
    document.getElementById('hidden-word-link').addEventListener('click', function(e) {
        e.preventDefault();
        completeChallenge();
    });
};

const enterURL = document.getElementById('enter-URL');
if (enterURL) {
    const inputElement = document.querySelector('input[type="text"]');
    enterURL.addEventListener('click', function() {
        const userInput = inputElement.value.toLowerCase();

        if (userInput==="page6.html") {
            completeChallenge();
        }
        else {
            alert("try Again");
        }
    });
    inputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            enterURL.click();
        }
    });
}

const enterAppearance = document.getElementById('appearance-enter');
if (enterAppearance) {
    const inputElement = document.querySelector('input[type="text"]');
    enterAppearance.addEventListener('click', function() {
        const userInput = inputElement.value.toUpperCase();

        if (userInput==="DEADLINE" || userInput==="DEAD LINE") {
            completeChallenge();
        }
        else {
            alert("not quite...");
        }
    });
    inputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            enterAppearance.click();
        }
    });
}

const enterAspect = document.getElementById('enter-aspect');
if (enterAspect) {
enterAspect.addEventListener('click', (e) => {
    completeChallenge();
})
}

const svg = document.querySelector('.canvas');
const maskCircles = document.querySelectorAll('.mask-circle');
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    maskCircles.forEach(circle => {
        circle.setAttribute('cx', mouseX);
        circle.setAttribute('cy', mouseY);
        circle.setAttribute('r', window.innerWidth * 0.03);
    });
});

const enterReveal = document.getElementById('enter-reveal');
if (enterReveal) {
    const randomTop = Math.floor(Math.random() * (window.innerHeight - enterReveal.offsetHeight));
    const randomLeft = Math.floor(Math.random() * (window.innerWidth - enterReveal.offsetWidth));
    enterReveal.style.top = randomTop + 'px';
    enterReveal.style.left = randomLeft + 'px';
    
    enterReveal.addEventListener('click', (e) => {
        completeChallenge();
    });
}

function stopClock() {
    clearInterval(interval);
    const currentTime = document.querySelector('.timer').textContent;
    document.getElementById('page9-header').style.display = 'none';
    document.getElementById('stop').style.display = 'none';
    const endScreen = document.getElementById('end-screen');
    const bigTimer = document.getElementById('big-timer');
    const playAgainBtn = document.getElementById('play-again');
    bigTimer.textContent = currentTime;
    endScreen.classList.add('visible');
    playAgainBtn.addEventListener('click',() => {
        localStorage.clear();
    });
}

const finalTimer = document.getElementById('final-timer')
if (finalTimer) {
    finalTimer.addEventListener('click', (e) => {
        stopClock();
})}