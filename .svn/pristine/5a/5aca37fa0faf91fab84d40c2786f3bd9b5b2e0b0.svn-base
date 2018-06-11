import {desiredLabels} from './constants';

export function filterDataToLabels(data) {
  const allowedPlayerYears = desiredLabels.reduce((acc, row) => {
    acc[`${row.pname}-${row.year}`] = true;
    return acc;
  }, {});
  return data.filter(player => allowedPlayerYears[`${player.pname}-${player.year}`]);
}

const nonNumericRows = {
  player: true,
  pname: true,
  year: true
};

export function updateData(data) {
  const formattedData = data.reduce((acc, row) => {
    const gameData = Object.keys(row)
      .filter(key => !nonNumericRows[key] && row[key] !== 'NA')
      .map((key, x) => ({x, y: Number(row[key])}));

    const updatedRow = {
      player: row.player,
      pname: row.pname,
      year: row.year,
      height: gameData[gameData.length - 1],
      gameData
    };
    acc.push(updatedRow);
    return acc;
  }, []);
  formattedData.sort((a, b) => a.year > b.year ? 1 : -1);
  return formattedData;
}

export function getDataDomain(data) {
  if (!data) {
    return [0, 10];
  }

  const {min, max} = data.reduce((acc, player) => {
    return player.gameData.reduce((mem, row) => {
      return {
        min: Math.min(mem.min, row.y),
        max: Math.max(mem.max, row.y)
      };
    }, acc);

  }, {min: Infinity, max: -Infinity});
  return [min, max];
}
