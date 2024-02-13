const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
let startTime, interval, elapsedTime = 0, isRunning = false;

function toggleTimer() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    clearInterval(interval);
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTimer, 10);
    isRunning = true;
    startBtn.style.display = 'none'; 
    stopBtn.style.display = 'inline-block'; 
}

function stopTimer() {
    clearInterval(interval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    stopBtn.style.display = 'none'; 
    startBtn.style.display = 'inline-block';
}

function resetTimer() {
    clearInterval(interval);
    elapsedTime = 0;
    timerDisplay.textContent = '00:00:00.000';
    isRunning = false;
    stopBtn.style.display = 'none'; 
    startBtn.style.display = 'inline-block'; 
}

function updateTimer() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = (currentTime % 1000).toString().slice(0, 3).padStart(3, '0');
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds}`;
}

startBtn.addEventListener('click', toggleTimer);
stopBtn.addEventListener('click', toggleTimer); 
resetBtn.addEventListener('click', resetTimer);
