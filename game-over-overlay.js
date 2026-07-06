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

  const statRows = [
    { label: "Total Enemies", value: stats.totalEnemies, category: "enemies" },
    { label: "Regular Enemies", value: stats.regularEnemies, category: "enemies" },
    { label: "Black Enemies", value: stats.blackEnemies, category: "enemies" },
    { label: "Red Enemies", value: stats.redEnemies, category: "enemies" },
    { label: "Red Frequency", value: `${stats.redFrequency}%`, category: "frequency" },
    { label: "Black Frequency", value: `${stats.blackFrequency}%`, category: "frequency" },
    { label: "Doubt Phrases", value: stats.doubtPhrases, category: "events" },
    { label: "Fader 1 Presses", value: stats.fader1presses, category: "inputs" },
    { label: "Fader 2 Presses", value: stats.fader2presses, category: "inputs" },
    { label: "Fader 3 Presses", value: stats.fader3presses, category: "inputs" },
    { label: "Fader 4 Presses", value: stats.fader4presses, category: "inputs" },
    { label: "Total Inputs", value: stats.totalInputs, category: "inputs" },
    { label: "Collisions", value: stats.collisions, category: "events" },
    { label: "Session Duration", value: `${stats.sessionDurationSeconds}s`, category: "session" }
  ];

  const panel = document.createElement('div');
  panel.classList.add('stats-summary-panel');

  panel.innerHTML = `
    <h3 class="stats-summary-heading">SESSION SUMMARY</h3>

    <input 
      type="text" 
      class="stats-search-input" 
      placeholder="Search stats..."
      aria-label="Search session stats"
    >

    <div class="stats-filter-row">
      <button class="stats-filter-button active" data-filter="all">All</button>
      <button class="stats-filter-button" data-filter="enemies">Enemies</button>
      <button class="stats-filter-button" data-filter="inputs">Inputs</button>
      <button class="stats-filter-button" data-filter="events">Events</button>
      <button class="stats-filter-button" data-filter="frequency">Frequency</button>
      <button class="stats-filter-button" data-filter="session">Session</button>
    </div>

    <div class="stats-export-row">
      <button class="stats-export-button" type="button">Export CSV</button>
    </div>

    <div class="stats-rows-container">
      ${statRows.map(row => `
        <div 
          class="stats-summary-row" 
          data-label="${row.label.toLowerCase()}" 
          data-category="${row.category}"
        >
          <span>${row.label}</span>
          <span>${row.value}</span>
        </div>
      `).join('')}
    </div>
  `;

  const searchInput = panel.querySelector('.stats-search-input');
  const filterButtons = panel.querySelectorAll('.stats-filter-button');
  const rows = panel.querySelectorAll('.stats-summary-row');
  const exportButton = panel.querySelector('.stats-export-button');

  let activeFilter = 'all';

  function applyStatsFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    rows.forEach(row => {
      const label = row.dataset.label;
      const category = row.dataset.category;

      const matchesSearch = label.includes(searchTerm);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;

      row.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';
    });
  }

  searchInput.addEventListener('input', applyStatsFilters);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      activeFilter = button.dataset.filter;
      applyStatsFilters();
    });
  });

  function exportStatsCSV() {
  const csvRows = ["Metric,Value"];

  statRows.forEach(row => {
    csvRows.push(`"${row.label}","${row.value}"`);
  });

  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "session-summary.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

exportButton.addEventListener('click', exportStatsCSV);

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
  winButton.textContent = 'START OVER';
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