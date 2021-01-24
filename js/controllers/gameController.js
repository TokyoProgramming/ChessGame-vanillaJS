const gameCtr = (player) => {
  let playerColor = player;
};

// player Control
const playerController = (currentPlayer) => {
  if (currentPlayer === 'player1') {
    return 'white';
  } else {
    return 'black';
  }
};

// switch player
const switchPlayer = (currentPlayer) => {
  if (currentPlayer === 'player1') {
    let str = currentPlayer;
    let res = str.replace('player1', 'player2');
    return res;
  } else if (currentPlayer === 'player2') {
    let str = currentPlayer;
    let res = str.replace('player2', 'player1');
    return res;
  }
};

export { gameCtr, playerController, switchPlayer };
