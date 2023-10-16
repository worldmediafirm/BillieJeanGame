class SoundManager {
    constructor() {
      // Initialize properties
      this.soundOn = true;
      //this.backgroundMusic = new Audio('background.mp3');
      this.enemyFallingSound = new Audio('/audio-assets/doll-fall.mp3');
      // Add more sounds as needed
  
      // Set up event listeners if necessary
    }
  
    toggleSound() {
      // Toggle sound on/off
      //this.soundOn = !this.soundOn;
    }
  
    playBackgroundMusic() {
      if (this.soundOn) {
        // Play background music
        this.backgroundMusic.play();
        this.backgroundMusic.loop = true; // Loop the music
      }
    }
  
    stopBackgroundMusic() {
      // Stop background music
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  
    enemySound() {
      if (this.soundOn) {
        // Play button click sound
        this.enemyFallingSound.play();//this may not be a part of our codebase
        //Add enemy sfx logic here
      }
    }

    djumcSound(){
        if(this.soundOn){
            //add DJ UMC sfx logic here
        }
    }

    faderSound(){
        if (this.soundOn){
            // Add Fader sfx logic here
        }
    }
  
    // Add more play methods for other sounds as needed
  
    // Add event listeners here if needed
  
    // Other methods and event handling can go here
  }

  //------------------------------------------------------------
  
  // declaring new sound object:
  
  
  