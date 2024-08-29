const doubtPhraseObject = {

    doubtPhraseArray: [
        '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-2-1.png',
        '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-3-1.png',
        '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-4-1.png',
        '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-5-1.png',
        '/graphic-assets/NEW-Enemy-Folder/Sprites/Enemy-Fire/Sprite-6-1.png'
    ],

    getRandomDoubtPhrase: function() {
        const randomIndex = Math.floor(Math.random() * this.doubtPhraseArray.length);
        return this.doubtPhraseArray[randomIndex];
    },

    Spawn1stFrameofDoubtPhrase: function() {
        const frameWidth = 100; // Width of each sprite frame
        const frameHeight = 50; // Height of each sprite frame (adjust as needed)
        
        // Create a container div for the sprite
        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'doubt-Phrases-initSpawn';
        spriteContainer.style.backgroundImage = `url(${this.getRandomDoubtPhrase()})`;
        spriteContainer.style.width = `${frameWidth}px`;
        spriteContainer.style.height = `${frameHeight}px`;
       
       spriteContainer.style.top = '333px'; // Set initial vertical position
    spriteContainer.style.left = '931px'; // Set initial horizontal position
       
        spriteContainer.style.backgroundSize = '450%'; // Ensure background image scales to container
        spriteContainer.style.backgroundRepeat = 'no-repeat'; // Prevent repeating background image

        setTimeout(()=>{
    
        // Append the container to the body or a specific container
        document.body.appendChild(spriteContainer);
    
        // Remove the container after a long time (for debugging purposes)
       setTimeout(() => {
            document.body.removeChild(spriteContainer);
            console.log('removed child' + spriteContainer);
        }, 540); // 5000 milliseconds = 5 seconds for testing

    }, 1770)
    },
    

    animateFullSpriteSheet: function() {
        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'doubt-Phrases';
        spriteContainer.style.backgroundImage = `url(${this.getRandomDoubtPhrase()})`;
        spriteContainer.style.position = 'absolute'; // Ensure it is positioned absolutely
        //spriteContainer.style.left = '100px'; // Set initial horizontal position
        //spriteContainer.style.top = '400px'; // Set initial vertical position
        document.body.appendChild(spriteContainer);
    
        const frameWidth = 100; // Width of each frame
        const frameHeight = 100; // Height of each frame
        const totalFrames = 5; // Number of frames in the sprite sheet
        let currentFrame = 0;
        let startTime = Date.now();
        
        // Parameters for parabolic motion
        const gravity = 66; // Gravity constant (adjust for effect)
        const initialVelocities = [60, 66, 80, 33, 77, 122]; // Array of possible initial velocities
        const randomIndex = Math.floor(Math.random() * initialVelocities.length);
        const initialVelocity = initialVelocities[randomIndex];
        const amplitude = 300; // Maximum height of the parabolic motion
        const frameRate = 166; // Frame rate in milliseconds
        let lastFrameTime = 0;
    
        function animate() {
            const now = Date.now();
            const elapsedTime = (now - startTime) / 600; // Time in seconds
    
            // Update the vertical position using parabolic motion formula
            const t = elapsedTime;
            const y = -0.5 * gravity * Math.pow(t, 2) + initialVelocity * t;// Parabolic motion equation
            const x = 855 + (t * -150); // Horizontal movement (adjust speed if needed)
    
            // Set the vertical and horizontal positions
            spriteContainer.style.top = `${Math.max(344 - y, 0)}px`; // Ensure it does not go above 0px
            spriteContainer.style.left = `${x}px`;
    
            // Update the background position to cycle through frames based on frame rate
            if (now - lastFrameTime > frameRate) {
                const frameOffset = (currentFrame * frameWidth) % (frameWidth * totalFrames);
                spriteContainer.style.backgroundPosition = `-${frameOffset}px 0`;
                
                if (currentFrame < totalFrames - 1) {
                    currentFrame = (currentFrame + 1) % totalFrames;
                }
                
                lastFrameTime = now;
            }
    
            // Continue animation if sprite is within bounds and has not yet reached the freeze frame
            if (x < window.innerWidth && parseFloat(spriteContainer.style.top) > 0 && currentFrame < totalFrames - 1) {
                requestAnimationFrame(animate);
            } else {
                // If the animation has reached the last frame, stop animating
                if (currentFrame === totalFrames - 1) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(spriteContainer);
                }
            }

            if (checkCollisionWithElement(spriteContainer)) {
                spriteContainer.remove();
                deathBar.updateHealth(deathBar.health + 66);
            }
            
            if (parseInt(spriteContainer.style.top) > 550 - 64) {
                spriteContainer.remove();
            }
        }
    
        animate();
    }
    
};

/*doubtPhraseObject.Spawn1stFrameofDoubtPhrase();
setTimeout(()=>{
    doubtPhraseObject.animateFullSpriteSheet();
}, 1750)*/
//Doubt Phrase Instantiations
setInterval(()=>{
    doubtPhraseObject.Spawn1stFrameofDoubtPhrase();

setTimeout(()=>{
    doubtPhraseObject.animateFullSpriteSheet();
}, 2300)
}, 1500)