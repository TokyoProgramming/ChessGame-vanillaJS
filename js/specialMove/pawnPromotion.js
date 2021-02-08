import { logResult } from '../main.js';

const promotionWhiteSelect = document.getElementById('promotion-white-select');
const promotionBlackSelect = document.getElementById('promotion-black-select');

const promotionCondition = () => {
  let logPlayer = logResult.player;
  let logCell = logResult.toCell.id[1];
  let logPieceType = logResult.pieceType.split('-')[1];

  // console.log(e);
  // write white pawn promotion
  if (
    (logPlayer === 'white' && logCell === '1' && logPieceType === 'pawn') ===
    true
  ) {
    promotionWhiteSelect.classList.add('selected');
    return true;

    // write black pawn promotion
  } else if (
    (logPlayer === 'black' && logCell === '8' && logPieceType === 'pawn') ===
    true
  ) {
    promotionBlackSelect.classList.add('selected');
    return true;
  } else {
    return false;
  }
};

const selectPiece = async (e) => {
  let getPiece = '';
  let player = '';

  getPiece = e.target;

  if (getPiece.id.split('-')[0] === 'promotion') {
    let promotionCell = logResult.toCell;
    promotionCell.lastChild.remove();
    let getId = getPiece.id;
    let editId = getId.split('-');
    promotionCell.appendChild(getPiece);
    const idName = (document.getElementById(
      `${getPiece.id}`
    ).id = `${editId[1]}-${editId[2]}`);
    try {
      promotionWhiteSelect.classList.remove('selected');
      promotionBlackSelect.classList.remove('selected');
    } catch (error) {}

    if (`${editId[1]}` === 'white') {
      player = 'player2';
    } else if (`${editId[1]}` === 'black') {
      player = 'player1';
    }

    return player;
  }
};

const promotion = (log, e) => {
  const getRes = promotionCondition(log);
  if (getRes === true) {
    return true;
  } else {
    return false;
  }
};

export { promotion, selectPiece };
