const domReady = require('domready');
import {select} from 'd3-selection';
import {scaleLinear, scaleOrdinal} from 'd3-scale';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide
} from 'd3-force';

// NO NEED TO EDIT THIS FUNCTION
domReady(() => {
  // this is the javascript fetch API, it uses a structure called a promise
  // to asyncronously make AJAX requests. Here we are using it acquire some data
  // that is being served by the gulp servelet.
  fetch('./data/world-lang.json')
    .then(response => response.json())
    .then(data => worldLangVis(data));
});

const COLORS = [
  '#625c4e',
  '#20476e',
  '#a19f93',
  '#a61618',
  '#897968',
  '#6c8aa4',
  '#454641',
  '#9c0f15',
  '#d4be99',
  '#7c8980',
  '#6cbe9d',
  '#b1a389',
  '#998965',
  '#525e5e',
  '#911116',
  '#775d44',
  '#417783',
  '#8a9b77',
  '#7a7369'
];

function worldLangVis(data) {
  const height = 2000;
  const width = 3000;
  const margin = {top: 200, left: 200, right: 200, bottom: 200};
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  // BUILD SCALES
  // PUT YOUR SCALE SHERE

  // REFORMAT DATA
  const preNodes = Object.keys(data).reduce((acc, language) => {
    const langFamily = data[language];
    langFamily.forEach(name => {
      if (!acc[name]) {
        acc[name] = {name, nodeType: 'country'};
      }
    });
    acc[language] = {name: language, nodeType: 'language'};
    return acc;
  }, {});
  const nodes = Object.keys(preNodes).map(key => preNodes[key]);

  const links = Object.keys(data).reduce((acc, language) => {
    const langFamily = data[language];
    langFamily.forEach(country => acc.push({source: country, target: language}));
    return acc;
  }, []);

  // SET UP PAGE ELEMENTS
  // PUT YOUR SELECT TYPE CODE HERE

  // RUN SIMULATION
  // PUT THE SIMULATION CODE HERE

  function ticked() {
    // PUT THE UPDATE CODE HERE
  }
}
