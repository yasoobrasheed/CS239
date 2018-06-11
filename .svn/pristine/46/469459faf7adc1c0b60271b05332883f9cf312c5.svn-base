export function pieData(data) {
  const pData = [];
  data.forEach(d => {
    pData.push(
      {
        label: d.part,
        count: Number(d.percentage),
        scale: Number(d.recovery)
      });
  });
  return pData;
}

export function colorArray(data) {
  const cArray = [];
  data.forEach(d => {
    cArray.push(`rgba(0, 0, 0, ${d.scale / 15})`);
  });
  return cArray;
}

export function maxY(data) {
  let max = 0;
  data.forEach(d => {
    if (Number(d) > max) {
      max = Number(d);
    }
  });
  return max;
}
