let timer;
let timeLeft = 25 * 60; 
let isRunning = false;
let currentMode = 'pomodoro'; 

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  document.querySelector('.time-text p').textContent = formatTime(timeLeft);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;

        const alarmSound = new Audio('assets/sound/bell.mp3');
        alarmSound.play();
        resetTimer();
      }
    }, 1000);
  }
}


function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;

  switch (currentMode) {
    case 'pomodoro': timeLeft = 25 * 60; break;
    case 'shortBreak': timeLeft = 5* 60; break;
    case 'longBreak': timeLeft = 15 * 60; break;
  }

  updateTimerDisplay();
}

function setPomodoro() {
  currentMode = 'pomodoro';
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

function setShortBreak() {
  currentMode = 'shortBreak';
  clearInterval(timer);
  isRunning = false;
  timeLeft = 5 * 60;
  updateTimerDisplay();
}

function setLongBreak() {
  currentMode = 'longBreak';
  clearInterval(timer);
  isRunning = false;
  timeLeft = 15 * 60;
  updateTimerDisplay();
}

document.querySelector('.button-action .btn:nth-child(1)').addEventListener('click', startTimer);
document.querySelector('.button-action .btn:nth-child(2)').addEventListener('click', resetTimer);
document.querySelector('.button-action .btn:nth-child(3)').addEventListener('click', pauseTimer);

document.querySelector('.button-mode .btn:nth-child(1)').addEventListener('click', setPomodoro);
document.querySelector('.button-mode .btn:nth-child(2)').addEventListener('click', setShortBreak);
document.querySelector('.button-mode .btn:nth-child(3)').addEventListener('click', setLongBreak);

updateTimerDisplay();

let isDarkMode = false;
let primaryBackgroundColor = "#55705A";  
let primaryColor = "#E48873";             
let secondaryColor = "#ECDCCB";           
let textColor = "#2B2119";                
let boxShadow = "rgba(17, 17, 26, 0.1) 0px 4px 16px 0px, rgba(17, 17, 26, 0.05) 0px 8px 32px 0px"; 

let toggleThemeButton = document.querySelector("#toggle-theme-button");

// Attach the event listener to the correct element
toggleThemeButton.addEventListener("click", toggleTheme);

function toggleLightMode() {
  // Set light mode colors
  primaryBackgroundColor = "#55705A";  
  primaryColor = "#E48873";
  secondaryColor = "#ECDCCB";
  textColor = "#2B2119";
  boxShadow = "rgba(17, 17, 26, 0.1) 0px 4px 16px 0px, rgba(17, 17, 26, 0.05) 0px 8px 32px 0px";

  // Apply light mode styles to CSS variables
  document.documentElement.style.setProperty("--primary-backgroundcolor", primaryBackgroundColor);
  document.documentElement.style.setProperty("--primary-color", primaryColor);
  document.documentElement.style.setProperty("--secondary-color", secondaryColor);
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty("--box-shadow", boxShadow);

  // Change theme button icon to sun (light mode)
  toggleThemeButton.classList.remove("fa-wand-magic");
  toggleThemeButton.classList.add("fa-seedling");

  // Update body background color
  document.body.style.backgroundColor = primaryBackgroundColor;
}

function toggleDarkMode() {
  // Set dark mode colors
  primaryBackgroundColor = "#E48873";  
  primaryColor = "#55705A";            
  secondaryColor = "#2B2119";      
  textColor = "#ECDCCB";           
  boxShadow = "rgba(239, 238, 229, 0.1) 0px 4px 16px 0px, rgba(239, 238, 229, 0.05) 0px 8px 32px 0px";

  // Apply dark mode styles to CSS variables
  document.documentElement.style.setProperty("--primary-backgroundcolor", primaryBackgroundColor);
  document.documentElement.style.setProperty("--primary-color", primaryColor);
  document.documentElement.style.setProperty("--secondary-color", secondaryColor);
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty("--box-shadow", boxShadow);

  // Change theme button icon to moon (dark mode)
  toggleThemeButton.classList.remove("fa-seedling");
  toggleThemeButton.classList.add("fa-wand-magic");

  // Update body background color
  document.body.style.backgroundColor = primaryBackgroundColor;
}

function toggleTheme() {
  if (isDarkMode) {
      isDarkMode = false;
      toggleLightMode();
  } else {
      isDarkMode = true;
      toggleDarkMode();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (isDarkMode) {
      toggleDarkMode();
  } else {
      toggleLightMode();
  }
});

