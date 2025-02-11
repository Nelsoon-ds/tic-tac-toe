// Game Logic
let board = [];
let count = 0;
let currentPlayer = "X"; // Track whose turn it is

// Track points
let player1_points = 0;
let player2_points = 0;

let player1_name = "Player X";
let player2_name = "Player O";

function buildBoard() {
  let gameBoardDiv = document.getElementById("board");
  gameBoardDiv.innerHTML = ""; // Reset the board when rebuilding

  /* Loop to build the board */
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";

      // Create a cell for the DOM
      let square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = i;
      square.dataset.col = j;

      // Event listener for player moves
      square.addEventListener("click", handleMove); // For every square, add handleMove
      gameBoardDiv.appendChild(square);
    }
  }
}

function updateScoreboard() {
  document.getElementById("display-player1-name").textContent = player1_name;
  document.getElementById("display-player2-name").textContent = player2_name;
  document.getElementById("player1-score").textContent = player1_points;
  document.getElementById("player2-score").textContent = player2_points;
}

function handleMove(event) {
  // Event.target refers to the specific square that was clicked
  let row = event.target.dataset.row; // Get row index from dataset
  let col = event.target.dataset.col; // Get column index from dataset

  if (board[row][col] === "") {
    // Only update if cell is empty
    board[row][col] = currentPlayer; // Update board array
    event.target.textContent = currentPlayer; // Update DOM (cell text)
    event.target.setAttribute("data-player", currentPlayer); // Set data attribute for styling

  }
  if (checkWin(currentPlayer)) {
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player

}

function checkWin(player) {
  // i = row, j = col

  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      announceWinner(player);
      return true;
    }
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === player &&
      board[1][j] === player &&
      board[2][j] === player
    ) {
      announceWinner(player);
      return true;
    }
  }
  // Check diagonals
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    announceWinner(player);
    return true;
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    announceWinner(player);

    return true;
  }

  // **Check for a draw** (all cells filled, no winner)
  if (board.flat().every((cell) => cell !== "")) {
    announceDraw();
    return true;
  }
  return false; // No win yet
}

function resetGame() {
  // Reset the points
  player1_points = 0;
  player2_points = 0;
  // Call update scoreboard to reflect the change
  updateScoreboard();

  document.querySelectorAll(".square").forEach(square => {
    square.textContent = ""; // Clear marks
    square.removeAttribute("data-player"); // Remove player-specific styles
  });


  // Reset to X
  currentPlayer = "X";
  // Build the board again
  buildBoard();
}

// Single function to handle winner announcement and reset
function announceWinner(player) {
  let winnerName = player === "X" ? player1_name : player2_name; // Add winnername for modal

    // Add points to the tally
    if (player === "X") {
      player1_points++;
    } else {
      player2_points++;
    }
  
  updateScoreboard(); // Make sure the scoreboard updates

  showModal(`${winnerName} wins!`);
}

function announceDraw() {
  showModal("It's a draw!");
}

function setPlayerNames() {
  let name1 = document.getElementById("player1-name").value.trim();
  let name2 = document.getElementById("player2-name").value.trim();

  // Only update names if something is entered
  if (name1 !== "") player1_name = name1;
  if (name2 !== "") player2_name = name2;

  // Update displayed names
  document.getElementById("display-player1-name").textContent = player1_name + ":";
  document.getElementById("display-player2-name").textContent = player2_name + ":";
}

// Function to show modal
function showModal(message) {
  document.getElementById("modal-message").textContent = message;
  document.getElementById("winner-modal").style.display = "flex";
}
// Close modal when clicking the button
document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("winner-modal").style.display = "none";
  buildBoard(); // Reset the board after closing modal
});

buildBoard();
