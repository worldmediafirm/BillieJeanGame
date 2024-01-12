const winnersList = new WinnersQueue();

function GameWon() {
  return new Promise((resolve, reject) => {
    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Create a heading element
    const heading = document.createElement('h2');
    heading.textContent = 'YOU WON!!';

    // Create an input element
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter your email';

    // Create a button element
    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.addEventListener('click', handleButtonClick);

    // Append elements to the overlay
    overlay.appendChild(heading);
    overlay.appendChild(input);
    overlay.appendChild(button);

    // Append the overlay to the game-container
    const gameContainer = document.querySelector('.game-container');
    gameContainer.appendChild(overlay);

    function handleButtonClick() {
      const playerEmail = input.value;

      // Check if the email is empty
      if (playerEmail.trim() === '') {
        alert('Please enter a valid email.');
        return;
      }

      // Check if the email has already been submitted
      if (winnersList.isEmailSubmitted) {
        alert('Email has already been submitted.');
        return;
      }

      // Check if the email already exists in the list
      if (winnersList.hasEmail(playerEmail)) {
        alert('Email already exists in the list.');
        return;
      }

      winnersList.enqueue(playerEmail);
      input.value = '';
      console.log(winnersList.head.value);
      let pendingPlayerEmail = winnersList.head.value;

      // Resolve the Promise with winnersList
      resolve(pendingPlayerEmail);
    }
  });
}

var sendClientEmailData = async (data) =>{

    
      await fetch('http://localhost:3000/winnersEmail', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: data,
    })
    .then(response => response.text()) // Convert the response to text
    .then(result => {
        console.log(result); // Handle the response from the server
    });
  }

  function GameLost() {
    
      // Create the overlay element
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
  
      // Create a heading element
      const heading = document.createElement('h2');
      heading.textContent = 'YOU LOSE!!';
  
      // Create a button element
      const button = document.createElement('button');
      button.textContent = 'RETRY';
      button.addEventListener('click', handleButtonClick);
  
      // Append elements to the overlay
      overlay.appendChild(heading);
      overlay.appendChild(button);
  
      // Append the overlay to the game-container
      const gameContainer = document.querySelector('.game-container');
      gameContainer.appendChild(overlay);
  
      function handleButtonClick() {
        location.reload();
        //StartGameFromBeginning(); --> Arbritray Function not yet delcared

      }
    ;
  }



// Function to handle button click event

