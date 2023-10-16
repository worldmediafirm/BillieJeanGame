const winnersList = new WinnersQueue();

function GameWon()
{
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
  winnersList.enqueue(playerEmail);
  input.value = "";
  console.log(winnersList);
}
}



// Function to handle button click event

