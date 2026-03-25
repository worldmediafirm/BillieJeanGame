function GameWon() {
  const winOverlay = document.createElement('div');
  winOverlay.classList.add('win-overlay');

  const winHeading = document.createElement('h2');
  winHeading.classList.add('win-heading');
  winHeading.textContent = 'YOU WON!!';

  const winButton = document.createElement('button');
  winButton.classList.add('win-button');
  winButton.textContent = 'PLAY AGAIN';
  winButton.addEventListener('click', handleButtonClick_winner);

  winOverlay.appendChild(winHeading);
  winOverlay.appendChild(winButton);

  document.body.appendChild(winOverlay);

  function handleButtonClick_winner() {
    sessionStorage.removeItem('mainCharacterBackground');
    window.location.href = 'main.html';
  }
}

function GameLost() {
  const lossOverlay = document.createElement('div');
  lossOverlay.classList.add('loss-overlay');

  const lossHeading = document.createElement('h2');
  lossHeading.classList.add('loss-heading');
  lossHeading.textContent = 'YOU LOSE!!';

  const retryButton = document.createElement('button');
  retryButton.classList.add('loss-retry-button');
  retryButton.textContent = 'RETRY';
  retryButton.addEventListener('click', handleButtonClick_retry);

  const goToHomepageButton = document.createElement('button');
  goToHomepageButton.classList.add('loss-home-button');
  goToHomepageButton.textContent = 'START OVER';
  goToHomepageButton.addEventListener('click', handleButtonClick_hompg);

  lossOverlay.appendChild(lossHeading);
  lossOverlay.appendChild(retryButton);
  lossOverlay.appendChild(goToHomepageButton);

  document.body.appendChild(lossOverlay);

  function handleButtonClick_retry() {
    location.reload();
  }

  function handleButtonClick_hompg() {
    sessionStorage.removeItem('mainCharacterBackground');
    window.location.href = 'main.html';
  }
}