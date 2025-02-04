function createGameBoard() {
    const rows = 3;
    const columns = 3;
    for (let i = 0; i < rows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      gameBoard.appendChild(row);
      for (let j = 0; j < columns; j++) {
        const column = document.createElement("div");
        column.classList.add("column");
        gameBoard.appendChild(column);
      }
    }
  }
  
  function removeBoard() {
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
  }

  // GameBoard

/* function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }
  const getBoard = () => board;
  const printBoard = () => {
    getBoard();
    console.log(board);
  };


  return { getBoard, printBoard, board };
} */

function GameController() {
  const game = GameBoard();
  const players = [
    new Player("Player-1", "X"), 
    new Player("Player-2", "O"),
  ];

  let activePlayer = players[0];
  
  
  
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const placeMark = (row, col) => {
    if (game.board[row][col] === "") /* Hvis aLle r/c er tomme så kan du placere et X eller O */  {
      game.board[row][col] = activePlayer === players[0] ? "X" : "O";
      switchPlayerTurn(); // Switch turns after a move
      printNewRound();
    } else {
      console.log("Invalid move, cell already occupied."); // Display error message if cell is already occupied
    }
  };
  const getActivePlayer = () => {
    console.log('Current active player turn:', activePlayer.name)}; // Change this to also display it in the dom


  const printNewRound = () => {
    game.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  return { placeMark, printNewRound, getActivePlayer };
}
