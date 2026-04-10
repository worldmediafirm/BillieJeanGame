function getGameStatsSummary() {
  const durationMs =
    gameStats.startTime && gameStats.endTime
      ? gameStats.endTime - gameStats.startTime
      : 0;

  const sessionDurationSeconds = (durationMs / 1000).toFixed(2);

  const totalEnemies = gameStats.totalEnemies || 0;

  const redFrequency = totalEnemies
    ? ((gameStats.redEnemies / totalEnemies) * 100).toFixed(1)
    : "0.0";

  const blackFrequency = totalEnemies
    ? ((gameStats.blackEnemies / totalEnemies) * 100).toFixed(1)
    : "0.0";

  const totalInputs =
    (gameStats.fader1presses || 0) +
    (gameStats.fader2presses || 0) +
    (gameStats.fader3presses || 0) +
    (gameStats.fader4presses || 0);

  return {
    totalEnemies,
    regularEnemies: gameStats.regularEnemies || 0,
    blackEnemies: gameStats.blackEnemies || 0,
    redEnemies: gameStats.redEnemies || 0,
    redFrequency,
    blackFrequency,
    doubtPhrases: gameStats.doubtPhrases || 0,
    fader1presses: gameStats.fader1presses || 0,
    fader2presses: gameStats.fader2presses || 0,
    fader3presses: gameStats.fader3presses || 0,
    fader4presses: gameStats.fader4presses || 0,
    totalInputs,
    collisions: gameStats.collisions || 0,
    sessionDurationSeconds
  };
}

function createStatsSummaryPanel() {
  const stats = getGameStatsSummary();

  const panel = document.createElement('div');
  panel.classList.add('stats-summary-panel');

  panel.innerHTML = `
    <h3 class="stats-summary-heading">SESSION SUMMARY</h3>
    <div class="stats-summary-row"><span>Total Enemies</span><span>${stats.totalEnemies}</span></div>
    <div class="stats-summary-row"><span>Regular Enemies</span><span>${stats.regularEnemies}</span></div>
    <div class="stats-summary-row"><span>Black Enemies</span><span>${stats.blackEnemies}</span></div>
    <div class="stats-summary-row"><span>Red Enemies</span><span>${stats.redEnemies}</span></div>
    <div class="stats-summary-row"><span>Red Frequency</span><span>${stats.redFrequency}%</span></div>
    <div class="stats-summary-row"><span>Black Frequency</span><span>${stats.blackFrequency}%</span></div>
    <div class="stats-summary-row"><span>Doubt Phrases</span><span>${stats.doubtPhrases}</span></div>
    <div class="stats-summary-row"><span>Fader 1 Presses</span><span>${stats.fader1presses}</span></div>
    <div class="stats-summary-row"><span>Fader 2 Presses</span><span>${stats.fader2presses}</span></div>
    <div class="stats-summary-row"><span>Fader 3 Presses</span><span>${stats.fader3presses}</span></div>
    <div class="stats-summary-row"><span>Fader 4 Presses</span><span>${stats.fader4presses}</span></div>
    <div class="stats-summary-row"><span>Total Inputs</span><span>${stats.totalInputs}</span></div>
    <div class="stats-summary-row"><span>Collisions</span><span>${stats.collisions}</span></div>
    <div class="stats-summary-row"><span>Session Duration</span><span>${stats.sessionDurationSeconds}s</span></div>
  `;

  return panel;
}


function GameWon() {
  const winOverlay = document.createElement('div');
  winOverlay.classList.add('win-overlay');

  const winHeading = document.createElement('h2');
  winHeading.classList.add('win-heading');
  winHeading.textContent = 'YOU WON!!';

  const statsPanel = createStatsSummaryPanel();

  const winButton = document.createElement('button');
  winButton.classList.add('win-button');
  winButton.textContent = 'PLAY AGAIN';
  winButton.addEventListener('click', handleButtonClick_winner);

  winOverlay.appendChild(winHeading);
  winOverlay.appendChild(statsPanel);
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

  const statsPanel = createStatsSummaryPanel();

  const retryButton = document.createElement('button');
  retryButton.classList.add('loss-retry-button');
  retryButton.textContent = 'RETRY';
  retryButton.addEventListener('click', handleButtonClick_retry);

  const goToHomepageButton = document.createElement('button');
  goToHomepageButton.classList.add('loss-home-button');
  goToHomepageButton.textContent = 'START OVER';
  goToHomepageButton.addEventListener('click', handleButtonClick_hompg);

  lossOverlay.appendChild(lossHeading);
  lossOverlay.appendChild(statsPanel);
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