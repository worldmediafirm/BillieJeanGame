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
    button.addEventListener('click', handleButtonClick_winner);

    // Append elements to the overlay
    overlay.appendChild(heading);
    overlay.appendChild(input);
    overlay.appendChild(button);

    // Append the overlay to the game-container
    const gameContainer = document.querySelector('.game-container');
    gameContainer.appendChild(overlay);

    function handleButtonClick_winner() {
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
      window.location.href = 'main.html';sdffffddfsddsdd
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
      const retryButton = document.createElement('button');
      retryButton.textContent = 'RETRY';
      retryButton.addEventListener('click', handleButtonClick_retry);
      retryButton.style.marginBottom = '12px';
      retryButton.style.backgroundColor = '#FF9D00';

      const goToHomepageButton = document.createElement('button');
      goToHomepageButton.textContent = 'START OVER';
      goToHomepageButton.addEventListener('click', handleButtonClick_hompg);
      goToHomepageButton.style.backgroundColor = '#7B542F';

      // Append elements to the overlay
      overlay.appendChild(heading);
      overlay.appendChild(retryButton);
      overlay.appendChild(goToHomepageButton);
  
      // Append the overlay to the game-container
      const gameContainer = document.querySelector('.game-container');
      gameContainer.appendChild(overlay);
  
      function handleButtonClick_retry() {
        location.reload();
      };
      function handleButtonClick_hompg(){
        sessionStorage.removeItem('mainCharacterBackground');
        window.location.href = 'main.html';
      };

  }



// Function to handle button click event

