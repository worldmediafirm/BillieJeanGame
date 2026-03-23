class ButtonModule {
  constructor() {
    this.fader1 = document.querySelector(".fader1");
    this.fader2 = document.querySelector(".fader2");
    this.fader3 = document.querySelector(".fader3");
    this.fader4 = document.querySelector(".fader4");

    this.firstClickEvent = null;
    this.secondClickEvent = null;

    this.addClickHandlers();
    this.addKeyboardSupport(); // <- Add this line
  }

  addClickHandlers() {
    const bind = (element, name, animateFn) => {
      if (element) {
        element.onclick = () => {
          this.handleFaderClick(name);
          animateFn();
        };
      }
    };

    bind(this.fader1, "fader1", this.animateFaders1.bind(this));
    bind(this.fader2, "fader2", this.animateFaders2.bind(this));
    bind(this.fader3, "fader3", this.animateFaders3.bind(this));
    bind(this.fader4, "fader4", this.animateFaders4.bind(this));
  }

  addKeyboardSupport() {
    document.addEventListener("keydown", (e) => {
      switch (e.key.toLowerCase()) {
        case 'a':
          this.handleFaderClick("fader1");
          this.animateFaders1();
          break;
        case 's':
          this.handleFaderClick("fader2");
          this.animateFaders2();
          break;
        case 'd':
          this.handleFaderClick("fader3");
          this.animateFaders3();
          break;
        case 'f':
          this.handleFaderClick("fader4");
          this.animateFaders4();
          break;
      }
    });
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
    this.animate(this.fader1, 'moveUpAnimation1');
  }

  animateFaders2() {
    this.animate(this.fader2, 'moveUpAnimation2');
  }

  animateFaders3() {
    this.animate(this.fader3, 'moveUpAnimation3');
  }

  animateFaders4() {
    this.animate(this.fader4, 'moveUpAnimation4');
  }

  animate(element, className) {
    if (!element) return;
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
    }, 1000);
  }
}

// Usage
const buttonModule = new ButtonModule();
