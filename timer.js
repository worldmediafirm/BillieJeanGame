function GameLostPictureOverlay() {
  console.log('GameLostPictureOverlay() fired');

  const gameOver = document.createElement('div');
  gameOver.className = 'game-over-pic';
  document.querySelector('.game-container').appendChild(gameOver);
  return gameOver;
}


function stopTheClockFunction() {
  console.log('stopTheClockFunction() fired');
  clearInterval(timerInterval);
}

const gameDuration = 7;
let currentTime = gameDuration;

const timer = document.createElement('div');
timer.classList.add('countdown');
document.querySelector('.game-container').appendChild(timer);

let endStateTriggered = false;

const timerInterval = setInterval(() => {
  console.log('tick', {
    currentTime,
    healthBarHealth: healthBar?.health,
    deathBarHealth: deathBar?.health,
    health,
    maxHealth,
    endStateTriggered
  });

  if (endStateTriggered) return;

  timer.textContent = currentTime;
  currentTime--;

  // LOSS
  if (currentTime <= 0 || deathBar.health >= 100) {
    console.log('LOSS branch hit');

    endStateTriggered = true;
    stopTheClockFunction();
    GameLostPictureOverlay();

    setTimeout(() => {
      console.log('Calling GameLost() now');
      GameLost();
    }, 1700);

    return;
  }

  // WIN
  if (healthBar.health >= 100 && deathBar.health < 100) {
    console.log('WIN branch hit');

    endStateTriggered = true;
    stopTheClockFunction();
    GameWon();
    return;
  }

  if (health >= maxHealth) {
    console.log('health >= maxHealth branch hit');
    handleHealthBarFull();
    clearInterval(timerInterval);
    return;
  }
}, 1000);