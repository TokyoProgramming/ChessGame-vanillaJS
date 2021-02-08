import { movementsCtr } from './movementsController.js';
import { kingMovementFiltering } from './checkController.js';
import { rows } from '../settings/boardCoordinate.js';

// get selected && active cells
// Move pieces
const movePiece = async (fromCell, activeCellsArr, toCell, opponentPlayer) => {
  let fromCellData = fromCell.lastChild;

  // remove opponent piece
  toCell.lastChild.remove();
  // move the piece
  toCell.appendChild(fromCellData);
  // remove circle && classList === 'active'
  toCell.classList.remove('active');
  // remove Circles && classList 'active' && 'scale-ctr'
  await removeCirclesClassList(activeCellsArr, opponentPlayer);
  // passant movements cell control
  try {
    if (toCell.classList.contains('passant-move')) {
      let passantPieceRow = toCell.id[1];
      let passantPieceCol = toCell.id[2];
      let passantBCell = rows[passantPieceRow][passantPieceCol - 1];
      let passantWCell = rows[passantPieceRow - 2][passantPieceCol - 1];

      toCell.classList.remove('passant-move');
      if (opponentPlayer === 'black') {
        passantBCell.classList.remove('passant-piece');
        passantBCell.lastChild.remove();
      } else if (opponentPlayer === 'white') {
        passantWCell.classList.remove('passant-piece');
        passantWCell.lastChild.remove();
      }
    } else {
      activeCellsArr.forEach((el) => {
        let data = el.cell;
        let classListData = data.classList;
        if (classListData.contains('passant-move')) {
          classListData.remove('passant-move');
          let row = data.id[1];
          let col = data.id[2];
          if (opponentPlayer === 'black') {
            let passantMoveCell = rows[row][col - 1];
            passantMoveCell.classList.remove('passant-piece');
          } else if (opponentPlayer === 'white') {
            let passantMoveCell = rows[row - 2][col - 1];
            passantMoveCell.classList.remove('passant-piece');
          }
        }
      });
    }
  } catch (error) {}

  // castling movements cell control
  try {
    // white king side castling
    if (toCell.classList.contains('white-kingSide')) {
      let castlingRookRow = +toCell.id[1];
      let castlingCol = toCell.id[2];
      let castlingRookCol = +castlingCol - 1;
      // remove X88 rook
      let rookPiece = rows[7][7].lastChild;
      rookPiece.remove();
      let rookMoveCell = rows[castlingRookRow - 1][castlingRookCol - 1];
      rookMoveCell.appendChild(rookPiece);
      toCell.classList.remove('white-kingSide');
      // white queen side castling
    } else if (toCell.classList.contains('white-queenSide')) {
      let castlingRookRow = +toCell.id[1];
      let castlingCol = toCell.id[2];
      let castlingRookCol = +castlingCol - 1;
      // remove X88 rook
      let rookPiece = rows[7][0].lastChild;
      rookPiece.remove();

      let rookMoveCell = rows[castlingRookRow - 1][castlingRookCol + 1];
      rookMoveCell.appendChild(rookPiece);
      toCell.classList.remove('white-queenSide');
      // black king side castling
    } else if (toCell.classList.contains('black-kingSide')) {
      let castlingRookRow = +toCell.id[1];
      let castlingCol = toCell.id[2];
      let castlingRookCol = +castlingCol - 1;
      // remove X88 rook
      let rookPiece = rows[0][7].lastChild;
      rookPiece.remove();
      let rookMoveCell = rows[castlingRookRow - 1][castlingRookCol - 1];
      rookMoveCell.appendChild(rookPiece);
      toCell.classList.remove('white-kingSide');
    } else if (toCell.classList.contains('black-queenSide')) {
      let castlingRookRow = +toCell.id[1];
      let castlingCol = toCell.id[2];
      let castlingRookCol = +castlingCol - 1;
      // remove X88 rook
      let rookPiece = rows[0][0].lastChild;
      rookPiece.remove();

      let rookMoveCell = rows[castlingRookRow - 1][castlingRookCol + 1];
      rookMoveCell.appendChild(rookPiece);
      toCell.classList.remove('white-queenSide');
    }
  } catch (error) {}

  // remove checked
  try {
    fromCell.classList.remove('checked');
  } catch (error) {}
  // remove classList passant-piece && passant-move
  try {
    activeCellsArr.forEach((el) => {
      el.cell.classList.remove('white-kingSide');
      el.cell.classList.remove('black-kingSide');
      el.cell.classList.remove('white-queenSide');
      el.cell.classList.remove('black-queenSide');
    });
  } catch (error) {}
};

// add circles to available cells
const cellActivate = async (e, getPlayer) => {
  let dataArr = await movementsCtr(e, getPlayer);

  // get pieceType
  let piecesType = dataArr[1];
  dataArr = dataArr[0];

  // if pieceType === 'king' => filter the movement
  try {
    let pieceType = piecesType.split('-');
    if (pieceType[1] === 'king') {
      dataArr = await kingMovementFiltering(getPlayer, dataArr);
    }
  } catch (error) {
    console.log('error');
  }

  dataArr.forEach((el) => {
    let data = el.cell;
    data.classList.add('active');

    // cell is empty
    if (data.children.length === 0) {
      const circleDiv = document.createElement('div');
      circleDiv.classList.add('circle');
      data.appendChild(circleDiv);

      // cell has piece
    } else if (data.lastChild.tagName === 'IMG') {
      let imgData = data.lastChild;
      imgData.classList.add('scale-ctr');

      // cell has number
    } else if (data.children[0].tagName === 'SPAN') {
      if (data.children.length > 1) {
        if (data.children[1].tagName !== 'IMG') {
          const circleDiv = document.createElement('div');
          circleDiv.classList.add('circle');
          data.appendChild(circleDiv);
        }
      } else {
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        data.appendChild(circleDiv);
      }
    }
  });
  return dataArr;
};

// remove circles && classList === 'active' && 'scale-ctr'
const removeCirclesClassList = async (activeCellsArr, opponentPlayer) => {
  try {
    activeCellsArr.forEach((el) => {
      let data = el.cell;

      let rowNum = data.id[1];
      let colNum = data.id[2];

      // cell is empty
      if (
        data.children[0].tagName !== 'IMG' &&
        data.children[0].tagName !== 'SPAN'
      ) {
        // remove circles
        data.children[0].remove();

        // cell has opponent piece
      } else if (data.lastChild.id.split('-')[0] === `${opponentPlayer}`) {
        // get opponent piece
        let scaleCtrImg = data.lastChild;
        scaleCtrImg.classList.remove('scale-ctr');

        // cell has number
      } else if (data.children[0].tagName === 'SPAN') {
        if (data.children[1].tagName === 'DIV') {
          let divData = data.children[1];
          divData.remove();
          // X81 - 2 span tags
        } else if (rowNum === '8' && colNum === '1') {
          if (data.children[2].tagName === 'DIV') {
            let circleDiv = data.children[2];
            circleDiv.remove();
          }
        }
      }
      data.classList.remove('active');
    });
  } catch (e) {
    console.log(e);
    console.log(activeCellsArr);
  }
};

// add color to the selected piece's cell
const addColor = (selectCell) => {
  let getId = selectCell.id.slice(1);
  let firstNum = String(getId).charAt(0);
  let secondNum = String(getId).charAt(1);

  if (firstNum % 2 == true) {
    if (secondNum % 2 == true) {
      selectCell.classList.add('clicked-1');
    } else {
      selectCell.classList.add('clicked-2');
    }
  } else {
    if (secondNum % 2 == true) {
      selectCell.classList.add('clicked-2');
    } else {
      selectCell.classList.add('clicked-1');
    }
  }
};

// remove color
const removeColor = (cell) => {
  // cell.classList.remove('clicked-1')
  try {
    cell.classList.remove('clicked-1') || cell.classList.remove('clicked-2');
  } catch (error) {}

  // chessBoard.classList.remove('board-opacity');
};

export {
  movePiece,
  cellActivate,
  removeCirclesClassList,
  addColor,
  removeColor,
};
