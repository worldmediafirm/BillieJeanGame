document.addEventListener('DOMContentLoaded', () => {
    const spriteContainer = document.querySelector(".Enemy-Sprite-Container");
    const totalFrames = 14; // Total number of frames in the sprite sheet
    let currentFrame = 0; // Current frame index
    spriteContainer.style.display = 'none';
    //setTimeout(()=>{

    setInterval(() => {
       spriteContainer.style.display = 'block';
      // Update background position for next frame
      const frameWidth = 220; // Width of each sprite frame
      const frameOffset = currentFrame * frameWidth;
      spriteContainer.style.backgroundPosition = `-${currentFrame * frameOffset}px 0`;
  
      // Move to next frame
      currentFrame = (currentFrame + 1) % totalFrames;
    }, 44); // Adjust frame rate as needed (in milliseconds)
//  }, 30);
 
  });