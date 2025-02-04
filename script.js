// Player object
class Player {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
  }
}


// DOM
const gameBoard = document.querySelector(".game-board");
const activePlayer = document.querySelector(".active-player");
const mark = document.querySelector(".mark");
const field = document.querySelector(".field").
field.addEventListener("click", () => {
  console.log('Field clicked');
});

