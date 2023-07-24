const timerDisplay = document.getElementById('timer');
let startTime, interval;

function startTimer() {
    clearInterval(interval);
    startTime = Date.now();
    interval = setInterval(updateTimer, 10);
}

function stopTimer() {
    clearInterval(interval);
}

function resetTimer() {
    clearInterval(interval);
    timerDisplay.textContent = '00:00:00.000';
}

function updateTimer() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = (currentTime % 1000).toString().slice(0, 3).padStart(3, '0');
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds}`;
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
