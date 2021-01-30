let pieces = [];
pieces = [
  {
    id: 1,
    name: 'white - pawn',
    id: 'white-pawn',
    imgSrc: './img/pieces/white-pawn.svg',
    type: 'w-pawn',
  },
  {
    id: 2,
    name: 'white - bishop',
    id: 'white-bishop',
    imgSrc: './img/pieces/white-bishop.svg',
    type: 'w-bishop',
  },
  {
    id: 3,
    name: 'white - king',
    id: 'white-king',
    imgSrc: './img/pieces/white-king.svg',
    type: 'w-king',
  },
  {
    id: 4,
    name: 'white - knight',
    id: 'white-knight',
    imgSrc: './img/pieces/white-knight.svg',
    type: 'w-knight',
  },
  {
    id: 5,
    name: 'white - queen',
    id: 'white-queen',
    imgSrc: './img/pieces/white-queen.svg',
    type: 'w-queen',
  },
  {
    id: 6,
    name: 'white - rook',
    id: 'white-rook',
    imgSrc: './img/pieces/white-rook.svg',
    type: 'w-rook',
  },
  {
    id: 7,
    name: 'black - pawn',
    id: 'black-pawn',
    imgSrc: './img/pieces/black-pawn.svg',
    type: 'b-pawn',
  },
  {
    id: 8,
    name: 'black - bishop',
    id: 'black-bishop',
    imgSrc: './img/pieces/black-bishop.svg',
    type: 'b-bishop',
  },
  {
    id: 9,
    name: 'black - king',
    id: 'black-king',
    imgSrc: './img/pieces/black-king.svg',
    type: 'b-king',
  },
  {
    id: 10,
    name: 'black - knight',
    id: 'black-knight',
    imgSrc: './img/pieces/black-knight.svg',
    type: 'b-knight',
  },
  {
    id: 11,
    name: 'black - queen',
    id: 'black-queen',
    imgSrc: './img/pieces/black-queen.svg',
    type: 'b-queen',
  },
  {
    id: 12,
    name: 'black - rook',
    id: 'black-rook',
    imgSrc: './img/pieces/black-rook.svg',
    type: 'b-rook',
  },
];

const wP = pieces[0];
const wB = pieces[1];
const wKing = pieces[2];
const wK = pieces[3];
const wQ = pieces[4];
const wR = pieces[5];

const bP = pieces[6];
const bB = pieces[7];
const bKing = pieces[8];
const bK = pieces[9];
const bQ = pieces[10];
const bR = pieces[11];

export { pieces, wP, wB, wKing, wK, wQ, wR, bP, bB, bKing, bQ, bR, bK };
