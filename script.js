function GameBoard() {
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
    console.log(board);
  };

  return { getBoard, printBoard, board };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const game = GameBoard();
  const players = [
    {
      name: playerOneName,
    },
    { name: playerTwoName },
  ];

  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const placeMark = (row, col) => {
    if (game.board[row][col] === "") {
      game.board[row][col] = activePlayer === players[0] ? "X" : "O";
      switchPlayerTurn(); // Switch turns after a move
      printNewRound();
    } else {
      console.log("Invalid move, cell already occupied.");
    }
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    game.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  return { placeMark, printNewRound };
}
const controller = GameController("David", "PC");
const game = GameBoard(); // Creates a new GameBoard object
