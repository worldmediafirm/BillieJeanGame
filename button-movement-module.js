class FaderAnimator {
    constructor(faderElements) {
      this.faderElements = faderElements;
    }
  
    animate() {
      this.faderElements.forEach(fader => {
        fader.classList.add('moveUpAnimation');
  
        setTimeout(() => {
          fader.classList.remove('moveUpAnimation');
        }, 1000);
      });
    }
  }
  
  // Usage example
  const fader1 = document.querySelector('.fader1');
  const fader2 = document.querySelector('.fader2');
  const fader3 = document.querySelector('.fader3');
  const fader4 = document.querySelector('.fader4');
  
  const faderElements = [fader1, fader2, fader3, fader4];
  const faderAnimator = new FaderAnimator(faderElements);
  
  faderAnimator.animate();
  