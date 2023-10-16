const soundManager = new SoundManager();

function createEnemy() {
  const enemy = document.createElement('div');
  enemy.className = 'enemies';
  enemy.style.left = Math.random() * (1280 - 64) + 'px'; // Random horizontal position
  enemy.style.top = '0px'; // Starting from the top
  document.querySelector('.game-container').appendChild(enemy);
  return enemy;
}

function GameLostPictureOverlay() {
  const gameOver = document.createElement('div');
  gameOver.className = 'game-over-pic';
  gameOver.style.left = '330px'; // Starting from the top
  gameOver.style.top = '0px';
  document.querySelector('.game-container').appendChild(gameOver);
  return gameOver;
}//GameLostPictureOverlay();

//GameLostPictureOverlay();

function animateEnemies() {
  const enemies = document.querySelectorAll('.enemies');
  const DJUMC = document.querySelector('.DJUMC');
  const DJUMCRect = DJUMC.getBoundingClientRect();
  // Calculate the dimensions for the smaller collision box
const smallerWidth = DJUMCRect.width - 100; // Adjust the value as needed
const smallerHeight = DJUMCRect.height - 100; // Adjust the value as needed

// Calculate the new left and top positions to keep the box centered
const smallerLeft = DJUMCRect.left + (DJUMCRect.width - smallerWidth) / 2;
const smallerTop = DJUMCRect.top + (DJUMCRect.height - smallerHeight) / 2;

// Create a smaller rectangle with adjusted dimensions and positions
const smallerRect = {
  left: smallerLeft,
  top: smallerTop,
  right: smallerLeft + smallerWidth,
  bottom: smallerTop + smallerHeight
};

// Use the smaller rectangle for collision detection

  enemies.forEach(enemy => {
    const top = parseInt(enemy.style.top) + 30; // Move 5 pixels down
    enemy.style.top = top + 'px';
    soundManager.enemySound();

    // Check collision with player (.DJUMC) element
    const enemyRect = enemy.getBoundingClientRect();
    if (doRectanglesOverlap(enemyRect, smallerRect)) {
      enemy.remove(); // Remove the enemy element from the DOM
      deathBar.updateHealth(deathBar.health +10);
    }

    if (top > (550 - 64)) {
      enemy.remove(); // Remove the enemy element from the DOM
    }
    //checkCollisionWithElement(enemy);
  });
  
}

function doRectanglesOverlap(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}


setInterval(() => {
  createEnemy();
}, 200); // Create a new enemy every 1 second

setInterval(() => {
  animateEnemies();
}, 100); // Animate enemies every 100 milliseconds


