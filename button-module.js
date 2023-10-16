class ButtonModule {
  constructor() {
    this.fader1 = document.querySelector(".fader1");
    this.fader2 = document.querySelector(".fader2");
    this.fader3 = document.querySelector(".fader3");
    this.fader4 = document.querySelector(".fader4");

   // this.faderElements = [this.fader1, this.fader2, this.fader3, this.fader4];

    this.firstClickEvent = null;
    this.secondClickEvent = null;

    this.addClickHandlers();
  }

  addClickHandlers() {
    this.fader1.onclick = () => {
      this.handleFaderClick("fader1");
      this.animateFaders1();
    };
    this.fader2.onclick = () => {
      this.handleFaderClick("fader2");
      this.animateFaders2();
    };
    this.fader3.onclick = () => {
      this.handleFaderClick("fader3");
      this.animateFaders3();
    };
    this.fader4.onclick = () => {
      this.handleFaderClick("fader4");
      this.animateFaders4();
    };
  }

  handleFaderClick(faderEvent) {
    if (!this.secondClickEvent) {
      this.secondClickEvent = this.firstClickEvent;
      this.firstClickEvent = faderEvent;
      healthBar.updateHealth(healthBar.health + 10);
    } else {
      this.firstClickEvent = this.secondClickEvent;
      this.secondClickEvent = faderEvent;
      this.checkClickEvents();
    }
  }

  checkClickEvents() {
    if (this.firstClickEvent !== this.secondClickEvent && this.secondClickEvent !== null) {
      healthBar.updateHealth(healthBar.health + 10);
    }
  }

  animateFaders1() {
      this.fader1.classList.add('moveUpAnimation1');
      setTimeout(() => {
        this.fader1.classList.remove('moveUpAnimation1');
      }, 1000);
  }
  animateFaders2() {
    this.fader2.classList.add('moveUpAnimation2');
    setTimeout(() => {
      this.fader2.classList.remove('moveUpAnimation2');
    }, 1000);
  }
  animateFaders3() {
    this.fader3.classList.add('moveUpAnimation3');
    setTimeout(() => {
      this.fader3.classList.remove('moveUpAnimation3');
    }, 1000);
  }
  animateFaders4() {
    this.fader4.classList.add('moveUpAnimation4');
    setTimeout(() => {
      this.fader4.classList.remove('moveUpAnimation4');
    }, 1000);
  }
}

// Usage example
const buttonModule = new ButtonModule();
