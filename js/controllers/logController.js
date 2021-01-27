let log = [];

const logCtr = (toCell, getPlayer) => {
  let logObj = {
    player: getPlayer,
    cell: toCell,
    pieceType: toCell.lastChild.id,
  };
  log.push(logObj);
  console.log(log);
  return log;
};

export { logCtr };
