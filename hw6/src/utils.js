import {rgb, hcl, lab} from 'd3-color';

// create an object that has keys from the values of an input array and values of a defaultValue
export const convertArrayToMap = (data, defaultValue) => data.reduce((acc, key) => {
  acc[key] = defaultValue;
  return acc;
}, {});

export function transposeObjectOfArrays(data) {
  const initialSet = Object.keys(data[0]).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
  return data.reduce((acc, row) => {
    Object.keys(row).forEach(key => acc[key].push(row[key]));
    return acc;
  }, initialSet);
}

export function buildColormap1D(vmm) {
  return function colormap1D(v) {
    const xx = (v - vmm[0]) / (vmm[1] - vmm[0]);
    return hcl(-10 + 110 * xx, 70 * Math.sin(xx * Math.PI), 25 + 75 * xx);
  };
}

export function buildColormap2D(yfrac) {
  return function colormap2D(x, y) {
    const xx = (x + 1) / 2;
    const yy = y / (0.1 + yfrac);
    return rgb(lab(25 + 75 * xx, 0, yy * 50));
  };
}

export function build2dStateColors(normedData, pcaData, colorMap) {
  return pcaData.dataProjected.reduce((acc, row, idx) => {
    // "-row[1]" negation to account for a sign flip somewhere between
    // scatterplot drawing over 2D map, and coloring used within states
    acc[normedData.StateCode[idx]] = colorMap(row[0], -row[1]);
    return acc;
  }, {});
}

export function build1dStateColors(ndata, colorMap, selectedPcaColumns) {
  const column = findSelectedColumns(selectedPcaColumns)[0];
  return ndata[column].reduce((acc, row, idx) => {
    acc[ndata.StateCode[idx]] = colorMap(Number(row));
    return acc;
  }, {});
}

export function findSelectedColumns(selectedPcaColumns) {
  return Object.keys(selectedPcaColumns).reduce((acc, key) => {
    if (!selectedPcaColumns[key]) {
      return acc;
    }
    return acc.concat(key);
  }, []);
}

export function computeSingleColumnDomain(data, selectedPcaColumns) {
  const column = findSelectedColumns(selectedPcaColumns)[0];
  return data[column].reduce((acc, row) => ({
    min: Math.min(row, acc.min),
    max: Math.max(row, acc.max)
  }), {min: Infinity, max: -Infinity});
}
