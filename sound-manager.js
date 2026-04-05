const SoundToggleObject = {
  
  soundOn: false, // Default sound is OFF
 

  // Function to toggle the sound
  toggleSound: function() {
    this.soundOn = !this.soundOn;
    this.SendCurrentGameSoundStatusToServer(this.createJSONFromSoundOnMethod());
  },

  // Function to add a click event listener to a button
  addClickListener: function(buttonId) {
    const button = document.querySelector(buttonId);
    if (button) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.toggleSound(); // Call the toggleSound method when the button is clicked
        console.log('Sound is now:', this.soundOn);
      });
    } else {
      console.error('Button with ID', buttonId, 'not found.');
    }
  },

  createJSONFromSoundOnMethod: function() {
    // Create an object with the soundOn value
    const now = new Date();
    var SoundStatusJSONObject = { date: `${now.toLocaleString()}`, soundOn: this.soundOn };
  
    // Return the object as a JSON string
    return (SoundStatusJSONObject);
},
  
  SendCurrentGameSoundStatusToServer: async (data) =>
  
  {

   const response = await fetch('/sound/CurrentSoundStatus', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
  })
  const result = await response.json();
  console.log(result);
  return result; // Handle the response from the server
  }
  };

  SoundToggleObject.SendCurrentGameSoundStatusToServer(SoundToggleObject.createJSONFromSoundOnMethod());
  SoundToggleObject.addClickListener('.Sound_Toggle_Button');
  
  // "TEST" value is false when server starts
  //SoundToggleObject.SendCurrentGameSoundStatusToServer(SoundToggleObject.createJSONFromSoundOnMethod());
  



