let log = [];

const logCtr = async (toCell, getPlayer) => {
  let logObj = {
    player: getPlayer,
    cell: toCell,
    pieceType: toCell.lastChild.id,
  };
  log.push(logObj);

  return log;
};

export { logCtr };
