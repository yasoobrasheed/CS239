import {transpose, dot, eig} from 'numericjs';
import {findSelectedColumns} from './utils';

/*
normalizeArray(arr) should return the result of applying
two operations to given 1-D array arr of strings representing numbers:
1) make the mean 0 ("demean")
2) make the variance 1
If all the array elements are equal, this should return an array of
0s, rather than array of NaNs (the result of 0 divided by 0).  This is
called (via normalizeData) on the input data once, after it is read,
and the results from this are later passed to doPCA.  To give a rough
sense of the associated code complexity, the reference solution does
this with about 5 lines of code.
*/
//
export function normalizeArray(arr) {
  arr = arr.map(d => Number(d));
  const mean = arr.reduce((acc, val) => acc + val) / arr.length;
  const stdev = Math.sqrt(arr.reduce((acc, val) => {
    return acc + Math.pow(val - mean, 2);
  }, 0) / arr.length);
  if (arr.every(d => d === 0)) {
    return arr;
  }
  return arr.map(d => (d - mean) / stdev);
}

// Extra functions

function calcCov(sV, dcols) {
  const pHolder = [... new Array(sV.length)].map((d) =>
  [... new Array(sV.length)].map((i) => 0));
  const covM = pHolder.map((val1, i) => {
    return pHolder[i].map((val2, j) => {
      return dot(dcols[i], dcols[j]) / (dcols[i].length);
    });
  });
  return covM;
}

function buildBasis(dcols) {
  const elemBasis = [];
  dcols.forEach((val, i) => {
    const basis = [];
    dcols.forEach((val2, j) => {
      if (j === i) {
        basis.push(1);
      } else {
        basis.push(0);
      }
    });
    elemBasis.push(basis);
  });
  return elemBasis;
}

/*
normalizeData(data) returns an object containing key:array pairs matching
those of the input data. The arrays are either copied as is (if key is in
ignores), or passed through normalizeArray (if key is not in ignores)
*/
export function normalizeData(data, ignores = []) {
  // note: phrasing this as a reduce would be more in keeping with
  // the coding of style of this class; oh well.
  const ndata = {};
  Object.keys(data).forEach(k => {
    const col = data[k];
    ndata[k] = (ignores.find(d => d === k) ? col : normalizeArray(col));
  });
  return ndata;
}

/*
doPCA performs PCA on those key:array pairs in ndata for which
columns contains key:true. ndata is the pre-processed data returned
by normalizeData, and columns reflects the state of the radio buttons
(as you can verify via console.log).

One warning about "row"/"column" terminology, as used in the
description here: these reflect the "columns" and "rows" of the
spreadsheet (CSV file) that the data came in.  With the terminology we
used in class, we'd say that we have "n" data points (rows), each of
which has D variables (columns). But this mental orientation of the
data may or may not match how you need to store the data in matrices
that numeric.js computes with. numeric.js considers a matrix to be a
2D array (an array of arrays). For example,
http://www.numericjs.com/workshop.php starts by defining a matrix "A",
which is an array of row vectors.  Then, the vector "x" can be
considered a column vector, and dot(A,x) is A times x.

The only parts of numericjs that you need are:
transpose : swap rows and columns (NxM matrix turns into MxN)
dot : all forms of linear algebra multiplication: matrix/matrix,
   matrix/vector, vector/vector (the usual "dot" product),
   vector/scalar, etc.
eig : finds eigensystems

Here is approximate pseudo code for what you have to do here:

0) (done for you): Form dcols, an array of the (normalized) data
   columns selected for PCA. selectedVariables is a corresponding
   array of the variable names, one for each selected column.

1) Compute M, the covariance matrix. Refer to
   https://piazza.com/class/jf9pbi0hf8i178?cid=342 question 3(a)

2) Compute the eigensystem of M with something like S=eig(M). The
   eigenvalues of M are in S.lambda.x, and the corresponding
   eigenvectors are (weirdly) transpose(S.E.x), not S.E.x.
   NOTE: If you see in the javascript console:
   "Uncaught Error: numeric: eigenvalue iteration does not converge -- increase maxiter?"
   then it is likely that one or more values being passed to
   numeric.eig are not numeric (e.g. "NaN").

3) Sort the eigensystem to eigenvalues in descending order (biggest
   fist); maintain the correspondence between eigenvalues and
   eigenvectors. Our PCA will use the first two eigenvectors; these
   are our two "principal components", and the variance along these
   components are the corresponding eigenvalues.

4) Project (with a vector-vector dot product) each data point
   (i.e. each "row" of the normalized data ndata) onto the two
   principal components, to get the dimensionally reduced coordinates
   for each data point.  This should just be an array of length-2
   arrays.

5) Scale the coordinates in the previous step so that every projected
   data point fits inside the square [-1,1] by [-1,1]. Scale the two
   coordinates equally, and make it so that at least one projected data
   point lies on the boundary of the square. This rescaling of the
   projected data will be used directly for the scatterplot display.

6) Find how the original data variables align with the principal components:
   For each selected data column, form an "elementary basis vector", i.e
   an array like [1,0,0] or [0,1,0], which is all 0s except for one 1.
   If B_i is the i'th elementary basis vector, B_i[i]==1; the other B_i[i]==0.
   Project all these basis vectors onto the principal components (let's
   call them C_0 and C_1), and make an array of these projections, along
   with the variable names, structured as:
   [[dot(B_0,C_0), dot(B_0,C_1), selectedVariable[0]],
    [dot(B_1,C_0), dot(B_1,C_1), selectedVariable[1]],
    [dot(B_2,C_0), dot(B_2,C_1), selectedVariable[2]], ...]

7) Return the results, as a new Javascript object with exactly these
   properties names: {
     component0: first component (eigenvector)
     component1: second component (eigenvector)
     variance0: first variance (eigenvalue)
     variance1: second variance (eigenvalue)
     varianceSum: sum of all variances
     dataProjected: result of step 5
     basisVectors: result of step 6
   }

To give a rough sense of the associated code complexity, the reference
solution does this with about 30 lines of uncommented code.
*/
export function doPCA(ndata, columns) {
  // selectedVariables is array of labels of columns selected for PCA
  const selectedVariables = findSelectedColumns(columns);
  // dcols collects (from ndata) the data columns to be analyzed
  // into a 2D array (an array of columns)
  const dcols = Object.keys(columns).reduce((acc, k) => {
    return columns[k] ? acc.concat([ndata[k]]) : acc;
  }, []);

  // (1) Covariance Matrix M
  const M = calcCov(selectedVariables, dcols);

  // (2) Compute Eigens
  const eigenS = eig(M);
  let eigenVal = eigenS.lambda.x;
  let eigenVec = transpose(eigenS.E.x);

  // (3) Sort Eigens
  const toSort = {};
  eigenVal.forEach((val, i) => {
    toSort[eigenVal[i]] = eigenVec[i];
  });

  eigenVal = eigenVal.sort().reverse();
  eigenVec = [];
  eigenVal.forEach((val, i) => {
    eigenVec.push(toSort[eigenVal[i]]);
  });

  const eigenSum = eigenVal;

  eigenVal = eigenVal.slice(0, 2);
  eigenVec = eigenVec.slice(0, 2);

  // (4) Vector Dot product
  const drows = transpose(dcols);

  const coord = [];
  drows.forEach((row) => {
    coord.push([dot(row, eigenVec[0]), dot(row, eigenVec[1])]);
  });

  // (5) Scale [-1, 1]

  let maxDrow = coord[0][0];
  coord.forEach(i => {
    i.forEach(j => {
      if (Math.abs(j) > maxDrow) {
        maxDrow = Math.abs(j);
      }
    });
  });

  const newCoord = [];
  coord.forEach((elem1, i) => {
    newCoord.push([]);
    elem1.forEach((elem2, j) => {
      newCoord[i][j] = elem2 / maxDrow;
    });
  });

  // (6) Alignment
  const elemBasis = buildBasis(dcols);

  const align = [];
  elemBasis.forEach((val, i) => {
    align.push([dot(val, eigenVec[0]), dot(val, eigenVec[1]), selectedVariables[i]]);
  });

  // (7) Return Statement
  return {
    component0: eigenVec[0],
    component1: eigenVec[1],
    variance0: eigenVal[0],
    variance1: eigenVal[1],
    varianceSum: eigenSum.reduce((acc, val) => acc + val, 0),
    dataProjected: newCoord,
    basisVectors: align
  };
}
