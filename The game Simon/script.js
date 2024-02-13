const soundPaths = {
  green: './sounds/ayfon-sms.mp3',
  red: './sounds/facebook_sms.mp3',
  yellow: './sounds/zvuk-sms1.mp3',
  blue: './sounds/sms-android.mp3',
};

const colors = ['green', 'red', 'yellow', 'blue'];

let sequence = [];
let playerSequence = [];
let level = 1;
let highestLevel = 0;
let isGameStarted = false;
let isPlayersTurn = false;
let currentColorIndex = 0;
let isDisplayingSequence = false;
let speed = 500;
let isMuted = false;

function playColorSound(color) {
  if (!isMuted) {
    const soundPath = soundPaths[color];
    const audio = new Audio();
    audio.src = soundPath;
    audio.volume = 0.3;
    audio.autoplay = true;
  }
}

function startGame() {
  if (!isGameStarted) {
    isGameStarted = true;
    sequence = [];
    playerSequence = [];
    level = 1;
    currentColorIndex = 0;
    isDisplayingSequence = false;

    document.getElementById('start-button').style.display = 'none';
    document.getElementById('reset-button').style.display = 'block';
    document.getElementById('reset-highest-button').style.display = 'none';
    document.getElementById('message').innerText = '';
    document.getElementById('level').innerText = `Level: ${level} (Your Turn)`;
    document.getElementById('highest-level').innerText = `Highest Level: ${highestLevel}`;

    nextLevel();
  }
}

function nextLevel() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);

  isPlayersTurn = false;
  isDisplayingSequence = true;
  displaySequence();
}

function displaySequence() {
  let i = 0;
  const interval = setInterval(() => {
    const color = sequence[i];
    playColorSound(color);
    lightUpButton(color);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      isPlayersTurn = true;
      isDisplayingSequence = false;
      clearColor();
    }
  }, speed);
}

function lightUpButton(color) {
  const button = document.getElementById(color);
  button.classList.add('active-outline');
  setTimeout(() => {
    button.classList.remove('active-outline');
  }, speed / 2);
}

function clearColor() {
  const board = document.querySelector('.simon-board');
  board.style.pointerEvents = 'auto';
  document.getElementById('level').innerText = `Level: ${level} (Your Turn)`;
}

function checkPlayerSequence() {
  if (!isPlayersTurn || isDisplayingSequence) return;

  const colorClicked = this.dataset.color;

  if (colorClicked === sequence[currentColorIndex]) {
    playerSequence.push(colorClicked);
    currentColorIndex++;
    this.classList.add('player-clicked');
    setTimeout(() => {
      this.classList.remove('player-clicked');
    }, speed / 2);

    if (currentColorIndex === sequence.length) {
      level++;
      document.getElementById('level').innerText = `Level: ${level}`;
      currentColorIndex = 0;
      playerSequence = [];
      document.querySelector('.simon-board').style.pointerEvents = 'none';

      if (level - 1 > highestLevel) {
        highestLevel = level - 1;
        document.getElementById('highest-level').innerText = `Highest Level: ${highestLevel}`;
      }

      setTimeout(() => {
        nextLevel();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  document.getElementById('message').innerText = `Game Over! Your Score: ${level - 1}`;
  isGameStarted = false;
  document.querySelector('.simon-board').style.pointerEvents = 'none';

  document.getElementById('start-button').style.display = 'block';
  document.getElementById('reset-button').style.display = 'none';
  document.getElementById('reset-highest-button').style.display = 'block';

  sequence = [];
  playerSequence = [];
  level = 1;
  currentColorIndex = 0;
  isDisplayingSequence = false;
  speed = 300;

  document.getElementById('level').innerText = `Level: ${level} (Your Turn)`;
  document.querySelector('.simon-board').style.pointerEvents = 'auto';
}

function resetGame() {
  isGameStarted = false;
  sequence = [];
  playerSequence = [];
  level = 1;
  highestLevel = 0;
  currentColorIndex = 0;
  isDisplayingSequence = false;
  speed = 300;

  document.getElementById('message').innerText = '';
  document.getElementById('level').innerText = `Level: ${level} (Your Turn)`;
  document.getElementById('highest-level').innerText = `Highest Level: ${highestLevel}`;
  document.querySelector('.simon-board').style.pointerEvents = 'auto';

  document.getElementById('start-button').style.display = 'block';
  document.getElementById('reset-button').style.display = 'none';
  document.getElementById('reset-highest-button').style.display = 'none';
}

function resetHighestLevel() {
  highestLevel = 0;
  document.getElementById('highest-level').innerText = `Highest Level: ${highestLevel}`;
}

document.getElementById('green').addEventListener('click', checkPlayerSequence);
document.getElementById('red').addEventListener('click', checkPlayerSequence);
document.getElementById('yellow').addEventListener('click', checkPlayerSequence);
document.getElementById('blue').addEventListener('click', checkPlayerSequence);

document.getElementById('start-button').addEventListener('click', startGame);

document.getElementById('reset-button').addEventListener('click', resetGame);

document.getElementById('reset-highest-button').addEventListener('click', resetHighestLevel);

document.getElementById('mute-checkbox').addEventListener('change', () => {
  isMuted = document.getElementById('mute-checkbox').checked;
});

document.getElementById('speed-slider').addEventListener('change', () => {
  speed = 800 - document.getElementById('speed-slider').value;
});
