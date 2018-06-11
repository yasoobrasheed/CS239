import {scaleLinear} from 'd3-scale';
import {mean} from 'mathjs';

const numYears = 2016 - 1930 + 1;
export const years = [...new Array(numYears)].map((d, i) => i + 1930);
const decades = years.filter((year) => ((year % 10) === 0));

// feel free to add (and possibly export) other helper/utility functions

// compute the per-year per-state rates of measles (the number of cases per
// million people), using populationData to get a per-year per-state
// population estimate.  The population should be linearly interpolated
// (perhaps with a scaleLinear) between the years (e.g. 1930, 1940, 1950, etc)
// where it is known; years after 2010 should use the 2010 population.  The
// structure of the data returned should be identical to the measlesData
// coming in: the only difference is that the numbers giving #cases in
// measlesData should be 1,000,000 * #cases / population in the data returned.
// Then given code returns the same measlesData given, which is incorrect.
export function calculateRates(measlesData, populationData) {

  let max = -Infinity;

  return measlesData.map((state, i) => {

    const stateData = populationData[i];
    const statePops = decades.map((yr) => parseInt(stateData[yr], 10));
    const stateScale = scaleLinear().domain(decades).range(statePops);
    const updatedStateData = years.reduce((acc, yr) => {
      const rate = 1000000 * (parseFloat(measlesData[i][yr]) / stateScale(yr));
      if (rate > max) {
        max = rate;
      }
      acc[yr] = rate;
      return acc;

    }, {});
    // console.log(`MAX = ${ max}`);
    updatedStateData.StateAbbr = stateData.StateAbbr;
    updatedStateData.StateName = stateData.StateName;
    return updatedStateData;

  });

}

// compute the mean US measles rate as a weighted average of the states'
// rates, weighted by the states' populations.  The return should be
// like one element of the given measlesRates, but without the
// StateName and StateAbbr keys. The given code returns the right
// kind of object, but may or may not be a useful part of your code.
export function calculateUSMeanRate(measlesRates, populationData) {
  // YOUR CODE HERE
  const scales = populationData.reduce((acc, state) => {
    const statePops = decades.map((yr) => parseInt(state[yr], 10));
    const StateName = state.StateName;
    acc[StateName] = scaleLinear().domain(decades).range(statePops);
    return acc;
  }, {});

  const keys = Object.keys(measlesRates[0]).reduce((acc, key) => {
    if (!isNaN(Number(key))) {
      // key is a year, not 'StateAbbr' or 'StateName'
      const stats = measlesRates.reduce((acc2, state) => {
        const rate = parseFloat(state[key], 10);
        const stateScale = scales[state.StateName];
        const stateYrPop = stateScale(parseInt(key, 10), 10);
        acc2.rateSum += stateYrPop * rate;
        acc2.popSum += stateYrPop;
        return acc2;
      }, {rateSum: 0, popSum: 0});
      acc[key] = stats.rateSum / stats.popSum;
    }
    return acc;
  }, {});
  return keys;
}

// Colormap to support ordinal comparisons of measles rates,
// designed to be legible even for recent years
export function buildColormapValue() {
  // YOUR CODE HERE: how you set this up should involve specific numeric values
  // for measles rates, which you can hard-code rather than re-learn from the data
  // return scaleLinear().domain([100, 666]).range([rgb(0, 0, 255), rgb(255, 0, 0)]);
  return scaleLinear()
    .domain([0, 30, 300, 3000, 30000])
    .range(['rgb(255, 255, 255)', 'rgb(255, 127, 127)', 'rgb(255, 0, 0)', 'rgb(127, 0, 0)', 'rgb(0, 0, 0)']);
}

// Colormap to support ordinal comparisons of per-state measles rates minus
// the national average, designed to be legible even for recent years
export function buildColormapValueMinusMean() {
  // YOUR CODE HERE: how you set this up should involve specific numeric values
  // for measles rates, which you can hard-code rather than re-learn from the data
  return scaleLinear()
    .domain([0, 20, 150, 1700, 21000])
    .range(['rgb(255, 255, 255)', 'rgb(255, 127, 127)', 'rgb(255, 0, 0)', 'rgb(127, 0, 0)', 'rgb(0, 0, 0)']);
}

export function sortMeasles(data, sortType) {
  if (sortType === 1) {
    return data.sort((a, b) => {
      const valsA = Object.values(a).slice(0, -1).slice(0, -1);
      const valsB = Object.values(b).slice(0, -1).slice(0, -1);
      const maxA = Math.max(...valsA);
      const maxB = Math.max(...valsB);
      if (maxA > maxB) {
        return -1;
      }
      return 1;
    });
  } else if (sortType === 0) {
    return data.sort((a, b) => {
      const valsA = Object.values(a).slice(0, -1).slice(0, -1);
      const valsB = Object.values(b).slice(0, -1).slice(0, -1);
      const meanA = mean(valsA);
      const meanB = mean(valsB);
      if (meanA > meanB) {
        return -1;
      }
      return 1;
    });
  }
}

export function findRate(abbr, year, data) {
  const stateData = data.filter((d) => {
    if (d.StateAbbr === abbr) {
      return d;
    }

  });
  return stateData[0][year];
}

