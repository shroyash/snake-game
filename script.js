document.addEventListener("DOMContentLoaded", function () {
  const startGame = document.getElementById("startGame");

  startGame.addEventListener("click", function () {
    // Popup container for player name input
    const popUpDiv = document.createElement("div");
    popUpDiv.className = "playerNameInput";
    popUpDiv.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      padding: 20px; background-color: #fff; border: 1px solid #ccc;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2); z-index: 1000;
    `;

    const form = document.createElement("form");

    // Input for Player 1
    const player1Label = document.createElement("label");
    player1Label.textContent = "Player 1 Name: ";
    const player1Input = document.createElement("input");
    player1Input.type = "text";
    player1Input.name = "player1";
    player1Input.required = true;
    player1Input.style.marginBottom = "10px";

    // Input for Player 2
    const player2Label = document.createElement("label");
    player2Label.textContent = "Player 2 Name: ";
    const player2Input = document.createElement("input");
    player2Input.type = "text";
    player2Input.name = "player2";
    player2Input.required = true;
    player2Input.style.marginBottom = "10px";

    // Submit Button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Start Game";
    submitButton.style.cssText = `
      padding: 10px 20px; background-color: #007BFF; color: #fff;
      border: none; cursor: pointer;
    `;

    // Append to form
    form.append(player1Label, player1Input, document.createElement("br"));
    form.append(player2Label, player2Input, document.createElement("br"));
    form.append(submitButton);

    // Append form to popup
    popUpDiv.appendChild(form);

    // Append popup to body
    document.body.appendChild(popUpDiv);

    // Form submit handler
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const player1Name = player1Input.value.trim();
      const player2Name = player2Input.value.trim();

      if (player1Name && player2Name) {
        // Save names to localStorage
        localStorage.setItem("player1", player1Name);
        localStorage.setItem("player2", player2Name);

        // Redirect to game page
        window.location.href = "./game.html";
      } else {
        alert("Please fill in both player names.");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const rollTheDice = document.getElementById("roll");
  const rollResult = document.getElementById("rollResult");
  const gameArea = document.getElementById("snake-game-area");
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");

  const grid = [];
function createGameGrid() {
  for (let i = 100; i >= 1; i--) {
    const cell = document.createElement("div");
    cell.textContent = i;
    cell.style.cssText = `
      border: 1px solid #ccc; padding: 10px; box-sizing: border-box;
      width: 10%; float: left; text-align: center;
    `;
    gameArea.appendChild(cell);
    grid.push(cell);
  }


  let j = 1; // Start from 1
  for (let i = 90; i <= 99; i++) {
    grid[i].textContent = j++; 
  }
}


  createGameGrid();

  
  const player1Name = localStorage.getItem("player1") || "Player 1";
  const player2Name = localStorage.getItem("player2") || "Player 2";

  player1.textContent = `${player1Name} (Green)`;
  player2.textContent = `${player2Name} (Red)`;

  let currentPlayer = 1; // 1 for player1, 2 for player2
  let playerPositions = [0, 0]; // Positions for player 1 and 2

  // Define snakes and ladders
const snakesAndLadders = {
  14: 4,  // Snake: 14 -> 4
 

  91: 81  // Ladder: 80 -> 99
};

rollTheDice.addEventListener("click", function () {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  rollResult.textContent = diceValue;

  const currentIndex = currentPlayer - 1; // Current player index (0 or 1)
  const opponentIndex = currentPlayer === 1 ? 1 : 0; // Opponent player index
  const previousValue = playerPositions[currentIndex]; // Previous position of the current player

  if (playerPositions[currentIndex] === 0 && diceValue === 1) {
    // Start player on the grid
    grid[90].style.backgroundColor = currentPlayer === 1 ? "green" : "red";
    playerPositions[currentIndex] = 1;
  } else if (playerPositions[currentIndex] > 0) {
    // Update position
    let newPosition = playerPositions[currentIndex] + diceValue;

    if (newPosition > 100) {
      newPosition = 100; // Ensure the player does not exceed the board
    }

    // Check for snakes or ladders
    if (snakesAndLadders[newPosition]) {
      const oldPosition = newPosition;
      newPosition = snakesAndLadders[newPosition];
      alert(
        `Player ${
          currentPlayer === 1 ? player1Name : player2Name
        } hit a ${oldPosition > newPosition ? "snake" : "ladder"}! Moved to ${newPosition}.`
      );
    }

    // Update grid visually
    if (newPosition <= 100) {
      const gridIndex = newPosition - 1;
      const prevGridIndex = previousValue - 1;

      // Clear old position
      if (previousValue > 0) {
        grid[prevGridIndex].style.backgroundColor = "";
      }

      // Set new position
      grid[gridIndex].style.backgroundColor =
        currentPlayer === 1 ? "green" : "red";
    }

    playerPositions[currentIndex] = newPosition;

    // Check if the player "eats" the opponent
    if (playerPositions[currentIndex] === playerPositions[opponentIndex]) {
      alert(
        `${currentPlayer === 1 ? player1Name : player2Name} ate ${
          currentPlayer === 1 ? player2Name : player1Name
        }!`
      );

      // Reset the opponent's position
      const opponentPreviousPosition = playerPositions[opponentIndex];
      playerPositions[opponentIndex] = 0;

      // Clear the opponent's position on the grid
      if (opponentPreviousPosition > 0) {
        grid[opponentPreviousPosition - 1].style.backgroundColor = "";
      }
    }
  }

  // Change turn
  if (diceValue !== 1 && diceValue !== 6) {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  // Update turn display
  const playerTurnResult = document.getElementById("playerTurnResult");
  playerTurnResult.textContent = `${
    currentPlayer === 1 ? player1Name : player2Name
  } turn !!`;

  // Check for win
  if (playerPositions[currentIndex] === 100) {
    alert(`${currentPlayer === 1 ? player1Name : player2Name} wins the game!`);
    // Reset the game or take other actions
  }
});

  
});


