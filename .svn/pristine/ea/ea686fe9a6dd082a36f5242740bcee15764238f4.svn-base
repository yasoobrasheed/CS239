import {scaleLinear} from 'd3-scale';
import {sumByGroup, myScaleLinear} from '../src/utils';
import {COLORS} from '../src/constants';
import CityData from '../data/city-data.json';

const smallExampleData = [
  {value: 1, color: 'red'},
  {value: 1, color: 'red'},
  {value: 1, color: 'red'},
  {value: 1, color: 'red'},
  {value: 1, color: 'blue'}
];

export function sumByGroupTest(t) {
  const smallGroups = sumByGroup(smallExampleData, 'color', 'value');
  t.deepEqual(smallGroups, {red: 4, blue: 1},
    'should be able to correctly compute a small example');

  const summedStates = sumByGroup(CityData, 'State', '2016 rank');
  const expectedResults = {
    'New York': 485,
    California: 12419,
    Illinois: 1381,
    Texas: 5915,
    Arizona: 913,
    Pennsylvania: 300,
    Florida: 3695,
    Ohio: 509,
    Indiana: 624,
    'North Carolina': 1055,
    Washington: 1347,
    Colorado: 2207,
    'District of Columbia': 21,
    Massachusetts: 843,
    Michigan: 1010,
    Tennessee: 695,
    Oregon: 874,
    Oklahoma: 576,
    Nevada: 272,
    Kentucky: 89,
    Maryland: 30,
    Wisconsin: 399,
    'New Mexico': 332,
    Missouri: 717,
    Georgia: 1128,
    Virginia: 813,
    Nebraska: 115,
    Minnesota: 355,
    Louisiana: 483,
    Kansas: 759,
    Hawaii: 55,
    Alaska: 66,
    'New Jersey': 1445,
    Idaho: 99,
    Iowa: 605,
    Alabama: 468,
    Arkansas: 117,
    Utah: 801,
    'Rhode Island': 137,
    'South Dakota': 145,
    Mississippi: 149,
    Connecticut: 1096,
    'South Carolina': 669,
    'North Dakota': 229,
    'New Hampshire': 264,
    Montana: 265
  };
  t.equal(
    Object.keys(summedStates).length,
    Object.keys(expectedResults).length,
    'should find the right number of groups when grouping by state');
  t.deepEqual(summedStates, expectedResults,
    'should compute the right values when grouping by state and summing by 2016 rank');

  const summedRanks = sumByGroup(CityData, '2016 rank', '2016 estimate');
  const expectedGroups = [...new Array(306)].map((d, i) => `${i + 1}`);
  t.deepEqual(expectedGroups, Object.keys(summedRanks),
    'should find the correct groups when grouping by 2016 rank');

  const groupedCities = sumByGroup(CityData, 'City', '2016 rank');
  t.deepEqual(Object.keys(groupedCities).length, 294,
    'should find the correct number of groups when grouping by city');

  t.end();
}

export function myScaleLinearTest(t) {
  const myTestScale = myScaleLinear([2, 10], [0, 1]);
  t.equal(typeof myTestScale, 'function', 'should return a function');

  const referenceTestScale = scaleLinear().domain([2, 10]).range([0, 1]);
  [2, 3, 10].forEach(value => {
    t.equal(myTestScale(value), referenceTestScale(value),
      `should find the correct scaled value for ${value}`);
  });

  const revScale = myScaleLinear([10, 2], [0, 1]);
  const referenceRevScale = scaleLinear().domain([10, 2]).range([0, 1]);
  [2, 3, 10].forEach(value => {
    t.equal(revScale(value), referenceRevScale(value),
      `should find the correct scaled value for ${value} for a reversed domain`);
  });

  t.end();
}

export function pieChartTest(t) {
  // waits 1 second to make sure that student content is rendered
  setTimeout(() => {
    const studentComponent = document.querySelector('.student-component');
    const arcs = [...studentComponent.querySelectorAll('path')];
    t.equal(arcs.length, 4, 'should correctly find four arcs');
    const foundColors = arcs.reduce((acc, row) => {
      acc[row.getAttribute('fill')] = true;
      return acc;
    }, {});
    t.deepEqual(Object.keys(foundColors).sort(), COLORS.slice(0, 4).sort(),
      'should find the arcs to be the correct colors');

    const labels = [...studentComponent.querySelectorAll('text')];
    t.equal(labels.length, 4, 'should correctly find four arcs');
    t.deepEqual(studentComponent.textContent, '18-2425-4445-64≥65',
      'should find the correct text content');

    t.end();
  }, 1000);
}
