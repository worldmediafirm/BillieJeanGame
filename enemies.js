async function GetCurrentGameSoundStatusFromServer() {
    const response = await fetch(`${window.APP_CONFIG.soundBase}/CurrentSoundStatus`);
    const RealTimeSoundStatus = await response.json();
    console.log(RealTimeSoundStatus);
    return RealTimeSoundStatus;
}

let gameMusic = null;
let currentSoundOn = false;
let spawnSpeedMultiplier = 1;

const startGameMusic = () => {
    try {
        if (!gameMusic) {
            gameMusic = new Audio('/audio-assets/Billie-Jean-TEST-AUDIO-for-Game.wav');
            gameMusic.loop = true;
        }

        if (gameMusic.paused) {
            gameMusic.play().catch(e => console.error("Error playing sound:", e));
        }
    } catch (error) {
        console.error("Error with creating audio object:", error);
    }
};

const stopGameMusic = () => {
    try {
        if (gameMusic) {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }
    } catch (error) {
        console.error("Error stopping sound:", error);
    }
};

async function refreshSoundState() {
    try {
        const response = await GetCurrentGameSoundStatusFromServer();
        currentSoundOn = response.soundOn === true;

        if (currentSoundOn) {
            startGameMusic();
        } else {
            stopGameMusic();
        }
    } catch (error) {
        console.error("Error refreshing sound state:", error);
    }
}

const EnemyObject = {
    baseSpeed: 30,

    createEnemy: function () {
        gameStats.totalEnemies++;
        gameStats.regularEnemies++;

        const enemy = document.createElement('div');
        enemy.className = 'enemies';
        enemy.style.left = Math.random() * (1280 - 64) + 'px';
        enemy.style.top = '0px';
        enemy.dataset.movementType = Math.floor(Math.random() * 3); // 0-linear, 1-trigonometric, 2-sinusoidal
        document.querySelector('.game-container').appendChild(enemy);
        return enemy;
    },

    createEnemyBlack: function () {
        gameStats.totalEnemies++;
        gameStats.blackEnemies++;

        const enemy = document.createElement('div');
        enemy.className = 'enemies-black';
        enemy.style.left = Math.random() * (1280 - 64) + 'px';
        enemy.style.top = '0px';
        enemy.dataset.movementType = Math.floor(Math.random() * 3); // 0-linear, 1-trigonometric, 2-sinusoidal
        document.querySelector('.game-container').appendChild(enemy);
        return enemy;
    },

    createEnemyRed: function () {
        gameStats.totalEnemies++;
        gameStats.redEnemies++;

        const enemy = document.createElement('div');
        enemy.className = 'enemies-red';
        enemy.style.left = Math.random() * (1280 - 64) + 'px';
        enemy.style.top = '0px';
        enemy.dataset.movementType = Math.floor(Math.random() * 3); // 0-linear, 1-trigonometric, 2-sinusoidal
        document.querySelector('.game-container').appendChild(enemy);
        return enemy;
    },

    spawnRandomEnemy: function () {
        const rand = Math.random();

        if (rand < 0.5) {
            return this.createEnemy(); // 50%
        } else if (rand < 0.8) {
            return this.createEnemyBlack(); // 30%
        } else {
            return this.createEnemyRed(); // 20%
        }
    },

    createCollisionEffect: function(left, top) {
        const collisionEffect = document.createElement('div');
        collisionEffect.className = 'collision-effect';
        collisionEffect.style.left = `${left}px`;
        collisionEffect.style.top = `${top}px`;
        document.querySelector('.game-container').appendChild(collisionEffect);

        setTimeout(() => {
            collisionEffect.remove();
        }, 100);
    },

    animateEnemies: function () {
        const enemies = document.querySelectorAll('.enemies, .enemies-black, .enemies-red');

        enemies.forEach(enemy => {
            switch (parseInt(enemy.dataset.movementType)) {
                case 0:
                    this.moveLinear(enemy);
                    break;
                case 1:
                    this.moveTrigonometric(enemy);
                    break;
                case 2:
                    this.moveSinusoidal(enemy);
                    break;
            }

            if (checkCollisionWithElement(enemy)) {
                gameStats.collisions++;

                const left = enemy.offsetLeft;
                const top = enemy.offsetTop;

                enemy.style.display = 'none';
                enemy.remove();

                this.createCollisionEffect(left, top);
                deathBar.updateHealth(deathBar.health + 22);
                return;
            }

            if (parseInt(enemy.style.top) > 550 - 64) {
                enemy.remove();
            }
        });
    },

    moveLinear: function (enemy) {
        const top = parseInt(enemy.style.top) + this.baseSpeed;
        enemy.style.top = `${top}px`;
    },

    moveTrigonometric: function (enemy) {
        const top = parseInt(enemy.style.top) + this.baseSpeed;
        const left = parseInt(enemy.style.left) + Math.sin(top / 100) * 50;
        enemy.style.top = `${top}px`;
        enemy.style.left = `${left}px`;
    },

    moveSinusoidal: function (enemy) {
        const top = parseInt(enemy.style.top) + this.baseSpeed;
        const cycle = (top / 30) % (2 * Math.PI);
        const left = parseInt(enemy.style.left) + Math.sin(cycle) * 50;
        enemy.style.top = `${top}px`;
        enemy.style.left = `${left}px`;
    },

    moveSinusoidalForDoubtPhrase: function (doubtphrase) {
        const top = parseInt(doubtphrase.style.top) + this.baseSpeed + 10;
        const cycle = (top / 30) % (2 * Math.PI);
        const left = parseInt(doubtphrase.style.left) + Math.sin(cycle) * 50;
        doubtphrase.style.top = `${top}px`;
        doubtphrase.style.left = `${left}px`;
    },

    EnemySoundEffect: function() {
        try {
            const sound = new Audio('/audio-assets/Enemy-Falls.wav');
            sound.volume = 0.1;
            sound.play().catch(e => console.error("Error playing sound:", e));
        } catch (error) {
            console.error("Error with creating audio object:", error);
        }
    }
};

// Poll server for live sound state
setInterval(async () => {
    await refreshSoundState();
}, 500);

// Difficulty scaling
setInterval(() => {
    spawnSpeedMultiplier += 0.05;

    // Optional safety cap so the game doesn't become absurd
    if (spawnSpeedMultiplier > 2.5) {
        spawnSpeedMultiplier = 2.5;
    }
}, 5000);

// Randomized enemy spawn loop
function spawnLoop() {
    EnemyObject.spawnRandomEnemy();

    if (currentSoundOn) {
        EnemyObject.EnemySoundEffect();
    }

    const nextSpawn = (400 + Math.random() * 550) / spawnSpeedMultiplier;
    setTimeout(spawnLoop, nextSpawn);
}

// Enemy animation interval
setInterval(() => {
    EnemyObject.animateEnemies();
}, 100);

// Initialize sound state immediately on load
refreshSoundState();

// Start randomized spawning
spawnLoop();