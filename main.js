const inputs = document.querySelectorAll('input');
const gameInfo = document.querySelector('#print');
const resetButtom = document.querySelector('#but');
const PLAYER_X_TURN = "Player X's turn";
const PLAYER_O_TURN = "Player O's turn";
const winningsConditionArray = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"]
];

let playerX;
let playerO;
let currentPlayerTurn;
let gameIsOver = false;
let countTurn = 0;
let clicks = 0;

class Player {
  playerScoreArray = [];
  isMyTurn = false;
  isPlayingGame = false;

  constructor(playerName) {
    this.playerName = playerName;
  }
  setMyTurn(isPlayerTurn) {
    this.isMyTurn = isPlayerTurn;
  }

  getName() {
    return this.playerName;
  }

  getScoreArray() {
    return this.playerScoreArray;
  }
}

initGame();

for (let input of inputs) {
  input.addEventListener('click', (event) => {

    const id = event.target.id;
    const nr = id[1];
    const selectTheId = document.querySelector('#b' + nr);

    if (gameIsOver === false) {
      if (currentPlayerTurn === playerX) {

        selectTheId.setAttribute('value', 'X');
        playerX.getScoreArray().push(nr);
        countTurn++;
      } else if (currentPlayerTurn === playerO) {

        selectTheId.setAttribute('value', 'O');
        playerO.getScoreArray().push(nr);
        countTurn++;
      }
      clicks++;
      swicthPlayerTurn();
    }
    if (countTurn === 9) {
      const draw = "Draw";

      changeGameInfo(draw);
      gameIsOver = true;
    }
  }, { once: true });
}

resetButtom.addEventListener('click', () => {
  window.location.reload();
});

let swicthPlayerTurn = () => {

  switch (currentPlayerTurn) {
    case playerO:
      playerO.setMyTurn(false);
      setPlayerTurn(playerX);
      checkWhoWinAndEditGameInfo(playerO);
      break;
    case playerX:
      playerX.setMyTurn(false);
      setPlayerTurn(playerO);
      checkWhoWinAndEditGameInfo(playerX);
      break;
    default:
      changeGameInfo("Error, Please reset the game");
      break;
  }
}

function initGame() {
  playerX = new Player(PLAYER_X_TURN);
  playerO = new Player(PLAYER_O_TURN);
  setPlayerTurn(playerO);
}

function checkWhoWinAndEditGameInfo(player) {
  winningsConditionArray.forEach(winningsCondition => {
    let correctedScoreCount = 0;

    correctedScoreCount = forEachPlayerScoreFoundIncreaseScoreCount(player.getScoreArray(), winningsCondition, correctedScoreCount);
    const isWinning = correctedScoreCount === 3;
    if (isWinning) {
      const winner = player === playerX ? `Player X Wins` : 'Player O Wins';
      changeGameInfo(winner);
      gameIsOver = true;
    }
  });
}

function changeGameInfo(informationsToChange) {
  gameInfo.innerHTML = informationsToChange;
}

function forEachPlayerScoreFoundIncreaseScoreCount(playerScoreArray, winningsCondition, scoreCount) {
  playerScoreArray.forEach(playerScore => {
    if (winningsCondition.includes(playerScore)) {
      scoreCount++;
    }
  })
  return scoreCount;
}

function setPlayerTurn(player) {
  currentPlayerTurn = player;
  player.setMyTurn(true);
  switch (player.getName()) {
    case PLAYER_X_TURN:
      changeGameInfo(PLAYER_X_TURN);
      break;
    case PLAYER_O_TURN:
      changeGameInfo(PLAYER_O_TURN);
      break;
    default:
      changeGameInfo("Error, Please reset the game");
      break;
  }
}