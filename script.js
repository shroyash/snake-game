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

  // Load player names
  const player1Name = localStorage.getItem("player1") || "Player 1";
  const player2Name = localStorage.getItem("player2") || "Player 2";

  player1.textContent = `${player1Name} (Green)`;
  player2.textContent = `${player2Name} (Red)`;

  let currentPlayer = 1; // 1 for player1, 2 for player2
  let playerPositions = [0, 0]; // Positions for player 1 and 2

  rollTheDice.addEventListener("click", function () {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    rollResult.textContent = diceValue;

    const currentIndex = currentPlayer - 1;
    if (playerPositions[currentIndex] === 0 && diceValue === 1) {
      // Start player on the grid
      grid[90].style.backgroundColor = currentPlayer === 1 ? "green" : "red";
      playerPositions[currentIndex] = 1;
    } else if (playerPositions[currentIndex] > 0) {
      // Move player based on dice value
      const newPosition = Math.min(
        playerPositions[currentIndex] + diceValue,
        100
      );
      grid[100 - playerPositions[currentIndex]].style.backgroundColor = ""; // Clear previous position
      playerPositions[currentIndex] = newPosition;
      grid[100 - newPosition].style.backgroundColor =
        currentPlayer === 1 ? "green" : "red";
    }

    // Change turn
    if (diceValue !== 1 && diceValue !== 6) {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    const playerTurnResult = document.getElementById("playerTurnResult");
    playerTurnResult.textContent = player1 + "turn !!"

    playerTurnResult.textContent = `${currentPlayer === 1 ? player1Name : player2Name} turn !!`
  });
});


