const doubtPhraseObject = {
  doubtPhraseArray: [
    '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-2-1.png',
    '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-3-1.png',
    '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-4-1.png',
    '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-5-1.png',
    '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-6-1.png'
  ],

  getRandomDoubtPhrase: function () {
    const randomIndex = Math.floor(Math.random() * this.doubtPhraseArray.length);
    return this.doubtPhraseArray[randomIndex];
  },

  Spawn1stFrameofDoubtPhrase: function () {
    const gameContainer = document.querySelector('.game-container');
    if (!gameContainer) return;

    const containerRect = gameContainer.getBoundingClientRect();

    const spriteContainer = document.createElement('div');
    spriteContainer.className = 'doubt-Phrases-initSpawn';
    spriteContainer.style.backgroundImage = `url(${this.getRandomDoubtPhrase()})`;
    spriteContainer.style.backgroundRepeat = 'no-repeat';
    spriteContainer.style.backgroundPosition = '0 0';
    spriteContainer.style.backgroundSize = '500%';

    /* Responsive placement relative to game container */
    spriteContainer.style.top = `${containerRect.height * 0.466}px`;
    spriteContainer.style.left = `${containerRect.width * 0.695}px`;

    setTimeout(() => {
      gameContainer.appendChild(spriteContainer);

      setTimeout(() => {
        if (spriteContainer.parentNode) {
          spriteContainer.remove();
        }
      }, 540);
    }, 1770);
  },

  animateFullSpriteSheet: function () {
    const gameContainer = document.querySelector('.game-container');
    if (!gameContainer) return;

    const containerRect = gameContainer.getBoundingClientRect();

    const spriteContainer = document.createElement('div');
    spriteContainer.className = 'doubt-Phrases';
    spriteContainer.style.backgroundImage = `url(${this.getRandomDoubtPhrase()})`;
    spriteContainer.style.backgroundRepeat = 'no-repeat';
    spriteContainer.style.backgroundPosition = '0 0';
    spriteContainer.style.backgroundSize = '500%';

    gameContainer.appendChild(spriteContainer);

    const computedStyle = getComputedStyle(spriteContainer);
    const frameWidth = parseFloat(computedStyle.width);
    const frameHeight = parseFloat(computedStyle.height);

    const totalFrames = 5;
    let currentFrame = 0;
    let startTime = Date.now();
    let lastFrameTime = 0;

    const gravity = 66;
    const initialVelocities = [60, 66, 80, 33, 77, 122];
    const randomIndex = Math.floor(Math.random() * initialVelocities.length);
    const initialVelocity = initialVelocities[randomIndex];
    const frameRate = 166;

    /* Responsive motion anchors */
    const startX = containerRect.width * 0.68;
    const startY = containerRect.height * 0.51;
    const horizontalSpeed = containerRect.width * 0.13;
    const floorY = containerRect.height * 0.88;

    function animate() {
      if (!spriteContainer.isConnected) return;

      const now = Date.now();
      const elapsedTime = (now - startTime) / 600;
      const t = elapsedTime;

      const y = -0.5 * gravity * Math.pow(t, 2) + initialVelocity * t;
      const x = startX - (t * horizontalSpeed);
      const topPosition = Math.max(startY - y, 0);

      spriteContainer.style.top = `${topPosition}px`;
      spriteContainer.style.left = `${x}px`;

      if (now - lastFrameTime >= frameRate) {
        const frameOffset = currentFrame * frameWidth;
        spriteContainer.style.backgroundPosition = `-${frameOffset}px 0`;

        if (currentFrame < totalFrames - 1) {
          currentFrame++;
        }

        lastFrameTime = now;
      }

      if (checkCollisionWithElement(spriteContainer)) {
        spriteContainer.remove();
        deathBar.updateHealth(deathBar.health + 66);
        return;
      }

      if (topPosition > floorY - frameHeight * 0.64) {
        spriteContainer.remove();
        return;
      }

      if (x > -frameWidth) {
        requestAnimationFrame(animate);
      } else {
        spriteContainer.remove();
      }
    }

    animate();
  }
};

/* Spawn loop */
setInterval(() => {
  doubtPhraseObject.Spawn1stFrameofDoubtPhrase();

  setTimeout(() => {
    doubtPhraseObject.animateFullSpriteSheet();
  }, 1500);
}, 1800);