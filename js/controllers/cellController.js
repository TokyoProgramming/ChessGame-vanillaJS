import { movementsCtr } from './movementsController.js';
import { kingMovementFiltering } from './checkController.js';

// get selected && active cells
// Move pieces
const movePiece = async (fromCell, activeCellsArr, toCell, opponentPlayer) => {
  let pieceData = fromCell.lastChild;
  let toCellData = toCell;

  // remove circle && classList === 'active'
  toCellData.lastChild.remove();
  toCellData.classList.remove('active');

  // move the piece
  toCellData.appendChild(pieceData);

  // remove Circles && classList 'active' && 'scale-ctr'
  await removeCirclesClassList(activeCellsArr, opponentPlayer);
};

// add circles to available cells
const cellActivate = async (e, getPlayer) => {
  let dataArr = await movementsCtr(e, getPlayer);

  let piecesType = dataArr[1];
  dataArr = dataArr[0];

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
  console.log(activeCellsArr);
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
      // delete opponent piece
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
