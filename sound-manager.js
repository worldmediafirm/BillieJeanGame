const SoundToggleObject = {
  soundOn: false,

  init: async function () {
    try {
      const response = await fetch('/sound/CurrentSoundStatus');
      const result = await response.json();

      this.soundOn = result.soundOn === true;
      console.log('Initial sound state from server:', this.soundOn);
    } catch (error) {
      console.error('Error initializing sound state:', error);
    }
  },

  toggleSound: async function () {
    this.soundOn = !this.soundOn;

    try {
      const result = await this.SendCurrentGameSoundStatusToServer(
        this.createJSONFromSoundOnMethod()
      );
      console.log('Sound is now:', this.soundOn);
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error toggling sound:', error);
    }
  },

  addClickListener: function (buttonId) {
    const button = document.querySelector(buttonId);

    if (button) {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        await this.toggleSound();
      });
    } else {
      console.error('Button with ID', buttonId, 'not found.');
    }
  },

  createJSONFromSoundOnMethod: function () {
    const now = new Date();
    return {
      date: now.toLocaleString(),
      soundOn: this.soundOn
    };
  },

  SendCurrentGameSoundStatusToServer: async function (data) {
    const response = await fetch('/sound/CurrentSoundStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  }
};

(async function () {
  await SoundToggleObject.init();
  SoundToggleObject.addClickListener('.Sound_Toggle_Button');
})();