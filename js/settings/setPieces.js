import {
  X11,
  X12,
  X13,
  X14,
  X15,
  X16,
  X17,
  X18,
  X21,
  X22,
  X23,
  X24,
  X25,
  X26,
  X27,
  X28,
  X31,
  X32,
  X33,
  X34,
  X35,
  X36,
  X37,
  X38,
  X41,
  X42,
  X43,
  X44,
  X45,
  X46,
  X47,
  X48,
  X51,
  X52,
  X53,
  X54,
  X55,
  X56,
  X57,
  X58,
  X61,
  X62,
  X63,
  X64,
  X65,
  X66,
  X67,
  X68,
  X71,
  X72,
  X73,
  X74,
  X75,
  X76,
  X77,
  X78,
  X81,
  X82,
  X83,
  X84,
  X85,
  X86,
  X87,
  X88,
  row2,
  row7,
} from './boardCoordinate.js';
import {
  wP,
  wB,
  wKing,
  wK,
  wQ,
  wR,
  bP,
  bB,
  bKing,
  bQ,
  bR,
  bK,
} from './piecesInfo.js';

const setChessPieces = () => {
  // white Pawn
  // row7.map((el) => {
  //   let whitePawn = document.createElement('img');
  //   whitePawn.src = `${wP.imgSrc}`;
  //   whitePawn.id = 'white-pawn';
  //   el.appendChild(whitePawn);
  // });

  let whitePawn = document.createElement('img');
  whitePawn.src = `${wP.imgSrc}`;
  whitePawn.id = 'white-pawn';
  X27.appendChild(whitePawn);

  //   white Rook
  let whiteRook_1 = document.createElement('img');
  whiteRook_1.src = `${wR.imgSrc}`;
  X81.appendChild(whiteRook_1);
  whiteRook_1.id = 'white-rook';
  let whiteRook_2 = document.createElement('img');
  whiteRook_2.src = `${wR.imgSrc}`;
  whiteRook_2.id = 'white-rook';
  X88.appendChild(whiteRook_2);

  //   white Knight
  let whiteKnight_1 = document.createElement('img');
  whiteKnight_1.src = `${wK.imgSrc}`;
  whiteKnight_1.id = 'white-knight';
  X62.appendChild(whiteKnight_1);
  let whiteKnight_2 = document.createElement('img');
  whiteKnight_2.src = `${wK.imgSrc}`;
  whiteKnight_2.id = 'white-knight';
  X67.appendChild(whiteKnight_2);

  //   white bishop
  let whiteBishop_1 = document.createElement('img');
  whiteBishop_1.src = `${wB.imgSrc}`;
  whiteBishop_1.id = 'white-bishop';
  X63.appendChild(whiteBishop_1);
  let whiteBishop_2 = document.createElement('img');
  whiteBishop_2.src = `${wB.imgSrc}`;
  whiteBishop_2.id = 'white-bishop';
  X66.appendChild(whiteBishop_2);

  //   white Queen
  let whiteQueen = document.createElement('img');
  whiteQueen.src = `${wQ.imgSrc}`;
  whiteQueen.id = 'white-queen';
  // X22.appendChild(whiteQueen);

  //   white King
  let whiteKing = document.createElement('img');
  whiteKing.src = `${wKing.imgSrc}`;
  whiteKing.id = 'white-king';
  X85.appendChild(whiteKing);

  //   black Pawn
  // row2.map((el) => {
  //   let blackPawn = document.createElement('img');
  //   blackPawn.src = `${bP.imgSrc}`;
  //   blackPawn.id = 'black-pawn';
  //   el.appendChild(blackPawn);
  // });

  let blackPawn = document.createElement('img');
  blackPawn.src = `${bP.imgSrc}`;
  blackPawn.id = 'black-pawn';
  // X77.appendChild(blackPawn);

  //   black Rook
  let blackRook_1 = document.createElement('img');
  blackRook_1.src = `${bR.imgSrc}`;
  blackRook_1.id = 'black-rook';
  X11.appendChild(blackRook_1);
  let blackRook_2 = document.createElement('img');
  blackRook_2.src = `${bR.imgSrc}`;
  blackRook_2.id = 'black-rook';
  X18.appendChild(blackRook_2);

  //   black Knight
  let blackKnight_1 = document.createElement('img');
  blackKnight_1.src = `${bK.imgSrc}`;
  blackKnight_1.id = 'black-knight';
  X32.appendChild(blackKnight_1);
  let blackKnight_2 = document.createElement('img');
  blackKnight_2.src = `${bK.imgSrc}`;
  blackKnight_2.id = 'black-knight';
  X37.appendChild(blackKnight_2);

  //   black bishop
  let blackBishop_1 = document.createElement('img');
  blackBishop_1.src = `${bB.imgSrc}`;
  blackBishop_1.id = 'black-bishop';
  X33.appendChild(blackBishop_1);
  let blackBishop_2 = document.createElement('img');
  blackBishop_2.src = `${bB.imgSrc}`;
  blackBishop_2.id = 'black-bishop';
  X36.appendChild(blackBishop_2);

  //   black King
  let blackKing = document.createElement('img');
  blackKing.src = `${bKing.imgSrc}`;
  blackKing.id = 'black-king';
  X15.appendChild(blackKing);

  //   black Queen
  let blackQueen = document.createElement('img');
  blackQueen.src = `${bQ.imgSrc}`;
  blackQueen.id = 'black-queen';
  // X77.appendChild(blackQueen);
};

export { setChessPieces };
