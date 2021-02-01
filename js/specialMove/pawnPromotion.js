const promotionSelect = document.querySelector('.promotion-select');

const promotion = (log, e) => {
  let logPlayer = log.player;
  let logCell = log.toCell.id[1];
  let logPieceType = log.pieceType.split('-')[1];

  // console.log(e);
  // write white pawn promotion
  if (
    (logPlayer === 'white' && logCell === '1' && logPieceType === 'pawn') ===
    true
  ) {
    console.log('white pawn promotion');
    let x = e.clientX;
    let y = e.clientY;

    let myDiv = document.createElement('div');

    myDiv.id = 'sample';
    myDiv.style.position = 'absolute';
    myDiv.style.left = `${x}`;
    myDiv.style.top = `${y}`;
    myDiv.style.width = '300px';
    myDiv.style.height = '300px';

    myDiv.innerHTML = 'white pawn promotion';
    promotionSelect.appendChild(myDiv);

    // write black pawn promotion
  } else if (
    (logPlayer === 'black ' && logCell === '8' && logPieceType === 'pawn') ===
    true
  ) {
    console.log('black pawn promotion');
  }
};

export { promotion };
