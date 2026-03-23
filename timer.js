function GameLostPictureOverlay() {
  const gameOver = document.createElement('div');
  gameOver.className = 'game-over-pic';
  document.querySelector('.game-container').appendChild(gameOver);
  return gameOver;
}

function stopTheClockFunction(){
  clearInterval(timerInterval);
}

const gameDuration = 7; // Total game duration in seconds
let currentTime = gameDuration;


const timer = document.createElement('div');
timer.classList.add('countdown');
document.querySelector('.game-container').appendChild(timer);


const timerInterval = setInterval(() => {
// Update the timer display
timer.textContent = currentTime;


// Decrement the time
currentTime--;


// Check if the timer has run out
if (currentTime === 0 || deathBar.health >= 100) {
// Handle the game logic when the timer runs out
stopTheClockFunction();
GameLostPictureOverlay();
setInterval(() => {
GameLost();  
}, 1700);

//setTimeout(function(){GameLost();}, 1500);
}

if (currentTime != 0 && healthBar.health >= 100 && deathBar.health < 100){
  stopTheClockFunction();
  GameWon()
  .then(data =>{
    sendClientEmailData(data);
  })
}
  
 // getClientEmailData(emailValue);

//if (GameWon().isEmailSubmitted === true){
//let emailValue = GameWon().head.value;  }



 




// Check if the health bar is full
if (health >= maxHealth) {
// Handle the game logic when the health bar is full
handleHealthBarFull();
clearInterval(timerInterval);
}
}, 1000);




timerInterval;





