import { logResult } from '../main.js';

const promotionWhiteSelect = document.querySelector('.promotion-white-select');

const promotionCondition = (log, e) => {
  let logPlayer = log.player;
  let logCell = log.toCell.id[1];
  let logPieceType = log.pieceType.split('-')[1];

  // console.log(e);
  // write white pawn promotion
  if (
    (logPlayer === 'white' && logCell === '1' && logPieceType === 'pawn') ===
    true
  ) {
    promotionWhiteSelect.classList.add('selected');

    return 1;

    // write black pawn promotion
  } else if (
    (logPlayer === 'black ' && logCell === '8' && logPieceType === 'pawn') ===
    true
  ) {
    return 2;
  } else {
    return false;
  }
};

const selectPiece = async (e) => {
  let getPiece = '';

  // get promotion piece
  try {
    getPiece = e.target;
    let promotionCell = logResult.toCell;
    promotionCell.lastChild.remove();
    let getId = getPiece.id;

    let editId = getId.split('-');
    console.log(editId[0]);
    console.log(editId[1]);
    console.log(editId[2]);
    promotionCell.appendChild(getPiece);
    console.log(promotionCell.lastChild.id);
    const idName = (document.getElementById(
      `${getPiece.id}`
    ).id = `${editId[1]}-${editId[2]}`);
    console.log(idName);

    promotionWhiteSelect.classList.remove('selected');
  } catch (error) {}
  // console.log(getPiece);
  // console.log(typeof getPiece);
  if (typeof getPiece !== 'string') {
    return getPiece;
  }
};

const promotion = async (log) => {
  const getRes = promotionCondition(log);
  if (getRes === 1) {
    console.log('promotion');
  }
  return false;
};

promotionWhiteSelect.addEventListener('click', selectPiece);

export { promotion };
