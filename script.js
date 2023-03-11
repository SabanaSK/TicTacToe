const EMPTY_VALUE = '';

const WINNING_COMBINATIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  [1, 5, 9],
  [3, 5, 7]

];

class Square {
  constructor(element) {
    this.element = element;

  }

  handleClick(event) {
    game.makeMove(event.target);
  }
}

class Game {
  constructor() {
    this.player1 = true;
    this.gameOver = false;
    this.message = document.querySelector('#game-info');
    this.resetButton = document.querySelector('#reset-button');
    this.square = new Square();
    this.gridSquares = [...document.querySelectorAll('input[type = "text"]')];

    for (let square of this.gridSquares) {
      square.addEventListener('click', this.square.handleClick.bind(this.square));
    }
    this.resetButton.addEventListener('click', this.reset.bind(this));
  }

  checkWin = player => WINNING_COMBINATIONS.some(
    combo => combo.every(index => this.gridSquares[index - 1].value === player)
  );

  checkDraw = () => !this.gridSquares.some(square => square.value === EMPTY_VALUE);

  gameOverMessage(player) {
    if (player) {
      this.message.textContent = 'Player X wins';
    } else {
      this.message.textContent = 'Player O wins';
    }
  }

  reset() {
    this.player1 = true;
    this.gameOver = false;
    this.message.textContent = '';

    for (let i = 0; i < this.gridSquares.length; i++) {
      this.gridSquares[i].value = '';
    }
  }

  makeMove(square) {
    if (this.gameOver) return;

    switch (square.value) {
      case EMPTY_VALUE:
        square.value = this.player1 ? 'X' : 'O'
        if (square.value === 'X') {
          square.style.color = '#EB3987';
        } else {
          square.style.color = '#3997EB ';
        }

        if (this.checkWin(square.value)) {
          this.gameOverMessage(this.player1);
          this.gameOver = true;
          break;
        }
        if (this.checkDraw()) {
          this.message.textContent = 'Draw';
          this.gameOver = true;
          break;
        }
        this.player1 = !this.player1;
        break;
    }
  }
}
const game = new Game();