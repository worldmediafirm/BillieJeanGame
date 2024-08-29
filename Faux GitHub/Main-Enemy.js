const MainEnemyObject = {
//There are 4 main 'positions' within the sprites for the main enemy: Spawn + Throw, move forward, move backward, idle


  // Properties for initial setup
  positionX: 0, // Initial x position
  positionY: 0, // Initial y position
  speed: 5, // Movement speed

  // Method to create the MainEnemyObject
  createMainEnemy: function() {
    const mainEnemy = document.createElement('div');
    mainEnemy.className = 'main-enemy';
    // Set initial position randomly
    this.positionX = Math.random() * (window.innerWidth - 100); // Adjust as needed
    this.positionY = Math.random() * (window.innerHeight - 100); // Adjust as needed
    mainEnemy.style.left = this.positionX + 'px';
    mainEnemy.style.top = this.positionY + 'px';
    document.querySelector('.game-container').appendChild(mainEnemy);
    return mainEnemy;
  },

  // Method to move the MainEnemyObject
  moveMainEnemy: function() {
    // Example: Move back and forth along the x-axis
    const direction = Math.random() < 0.5 ? -1 : 1; // Random direction
    this.positionX += this.speed * direction;
    this.positionY = this.positionY; // Y position remains constant
    // Adjust position limits as needed
    if (this.positionX < 0) this.positionX = 0;
    if (this.positionX > window.innerWidth - 100) this.positionX = window.innerWidth - 100;
    
    const mainEnemy = document.querySelector('.main-enemy');
    if (mainEnemy) {
      mainEnemy.style.left = this.positionX + 'px';
      mainEnemy.style.top = this.positionY + 'px';
    }
  },

  // Method to throw objects towards the Main_Character
  throwObject: function() {
    // Example: Generate projectile towards Main_Character
    const projectile = document.createElement('div');
    projectile.className = 'projectile';
    projectile.style.left = this.positionX + 'px'; // Start at MainEnemyObject's position
    projectile.style.top = this.positionY + 'px';
    document.querySelector('.game-container').appendChild(projectile);

    const mainCharacter = document.querySelector('.Main_Character');
    if (mainCharacter) {
      // Calculate trajectory towards Main_Character
      const dx = mainCharacter.offsetLeft - this.positionX;
      const dy = mainCharacter.offsetTop - this.positionY;
      const angle = Math.atan2(dy, dx);
      const speed = 10; // Adjust as needed

      // Move projectile in the calculated direction
      const moveProjectile = setInterval(() => {
        this.positionX += Math.cos(angle) * speed;
        this.positionY += Math.sin(angle) * speed;
        projectile.style.left = this.positionX + 'px';
        projectile.style.top = this.positionY + 'px';
        
        // Check collision with Main_Character (implement your collision detection)
        if (checkCollisionWithMainCharacter(projectile)) {
          clearInterval(moveProjectile);
          projectile.remove();
          // Handle collision actions here
        }

        // Remove projectile if it goes out of bounds
        if (this.positionX < 0 || this.positionX > window.innerWidth ||
            this.positionY < 0 || this.positionY > window.innerHeight) {
          clearInterval(moveProjectile);
          projectile.remove();
        }
      }, 50); // Adjust interval for smoothness
    }
  }
};

// Example usage:
MainEnemyObject.createMainEnemy(); // Create the MainEnemyObject
setInterval(() => MainEnemyObject.moveMainEnemy(), 1000); // Move MainEnemyObject
setInterval(() => MainEnemyObject.throwObject(), 3000); // Throw objects periodically
