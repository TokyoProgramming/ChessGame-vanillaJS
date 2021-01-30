const logCtr = async (toCell, getPlayer, log) => {
  let logObj = {
    player: getPlayer,
    cell: toCell,
    pieceType: toCell.lastChild.id,
  };
  log.push(logObj);

  return log;
};

export { logCtr };
