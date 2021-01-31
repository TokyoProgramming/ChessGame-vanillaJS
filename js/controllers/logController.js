const logCtr = async (toCell, getPlayer, log) => {
  let logObj = {
    player: getPlayer,
    cell: toCell,
    pieceType: toCell.lastChild.id,
  };
  log.push(logObj);

  return log;
};

const blackLog = async (result) => {
  const bLog = result;

  let blackLogData = [];
  try {
    blackLogData = bLog.filter((el) => {
      return el.player === 'black';
    });
  } catch (error) {}
  return blackLogData;
};
const whiteLog = async (result) => {
  const wLog = result;
  let whiteLogData = [];
  try {
    whiteLogData = wLog.filter((el) => {
      return el.player === 'white';
    });
  } catch (error) {}

  return whiteLogData;
};

export { logCtr, blackLog, whiteLog };
