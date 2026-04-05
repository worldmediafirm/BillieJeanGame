async function GetCurrentGameSoundStatusFromServer() {
    const response = await fetch('/sound/CurrentSoundStatus');
    const RealTimeSoundStatus = await response.json();
    console.log(RealTimeSoundStatus);
    return RealTimeSoundStatus;
  }
  
  const GamePlayMusic = () => {
      try {
          const sound = new Audio('/audio-assets/Billie-Jean-TEST-AUDIO-for-Game.wav');
          sound.play().catch(e => console.error("Error playing sound:", e));
      } catch (error) {
          console.error("Error with creating audio object:", error);
      }
  }
  
  const EnemyObject = {
      baseSpeed: 30, // Adjust speed as needed
  
      createEnemy: function () {
          const enemy = document.createElement('div');
          enemy.className = 'enemies';
          enemy.style.left = Math.random() * (1280 - 64) + 'px';
          enemy.style.top = '0px';
          enemy.dataset.movementType = Math.floor(Math.random() * 3); // 0-linear, 1-trigonometric, 2-sinusoidal
          document.querySelector('.game-container').appendChild(enemy);
          return enemy;
      },
  
      createEnemyBlack: function () {
          const enemy = document.createElement('div');
          enemy.className = 'enemies-black';
          enemy.style.left = Math.random() * (1280 - 64) + 'px';
          enemy.style.top = '0px';
          enemy.dataset.movementType = Math.floor(Math.random() * 3); // 0-linear, 1-trigonometric, 2-sinusoidal
          document.querySelector('.game-container').appendChild(enemy);
          return enemy;
      },
  
      createEnemyRed: function () {
          const enemy = document.createElement('div');
          enemy.className = 'enemies-red';
          enemy.style.left = Math.random() * (1280 - 64) + 'px';
          enemy.style.top = '0px';
          enemy.dataset.movementType = Math.floor(Math.random() * 3); // 0-linear, 1-trigonometric, 2-sinusoidal
          document.querySelector('.game-container').appendChild(enemy);
          return enemy;
      },
  
      createCollisionEffect: function(left, top) {
          const collisionEffect = document.createElement('div');
          collisionEffect.className = 'collision-effect';
          collisionEffect.style.left = `${left}px`;
          collisionEffect.style.top = `${top}px`;
          document.querySelector('.game-container').appendChild(collisionEffect);
      
          // Optionally, remove the effect after a short delay
          setTimeout(() => {
            collisionEffect.remove();
          }, 100); // Adjust delay as needed
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
                  enemy.remove();
                  this.createCollisionEffect();
                  deathBar.updateHealth(deathBar.health + 22);
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
          const left = parseInt(enemy.style.left) + Math.sin(top / 100) * 50; // Modify amplitude/phase as needed
          enemy.style.top = `${top}px`;
          enemy.style.left = `${left}px`;
      },
  
      moveSinusoidal: function (enemy) {
          const top = parseInt(enemy.style.top) + this.baseSpeed;
          const cycle = (top / 30) % (2 * Math.PI); // Cycle every 30px
          const left = parseInt(enemy.style.left) + Math.sin(cycle) * 50; // Sinusoidal movement amplitude 50px
          enemy.style.top = `${top}px`;
          enemy.style.left = `${left}px`;
      },
  
      moveSinusoidalForDoubtPhrase: function (doubtphrase) {
          const top = parseInt(doubtphrase.style.top) + this.baseSpeed + 10;
          const cycle = (top / 30) % (2 * Math.PI); // Cycle every 30px
          const left = parseInt(doubtphrase.style.left) + Math.sin(cycle) * 50; // Sinusoidal movement amplitude 50px
          doubtphrase.style.top = `${top}px`;
          doubtphrase.style.left = `${left}px`;
      },
  
      EnemySoundEffect: function() {
          try {
              const sound = new Audio('/audio-assets/Enemy-Falls.wav');
              sound.volume = .1;
              sound.play().catch(e => console.error("Error playing sound:", e));
          } catch (error) {
              console.error("Error with creating audio object:", error);
          }
      }
  };
  
  
  GetCurrentGameSoundStatusFromServer().then(response => {
  setInterval(() => {
        EnemyObject.createEnemy();
        if (response.soundOn === true) {
            EnemyObject.EnemySoundEffect();
        }
    }, 1325);
  
    setInterval(() => {
      EnemyObject.createEnemyBlack();
      if (response.soundOn === true) {
          EnemyObject.EnemySoundEffect();
      }
  }, 1050);
  
  setInterval(() => {
    EnemyObject.createEnemyRed();
    if (response.soundOn === true) {
        EnemyObject.EnemySoundEffect();
    }
  }, 800);
  
    setInterval(() => {
        EnemyObject.animateEnemies();
    }, 100);
  

  
    if (response.soundOn === true){
      GamePlayMusic();
  }
  });
  