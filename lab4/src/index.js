const domReady = require('domready');
import {select, event} from 'd3-selection';
import {scaleOrdinal} from 'd3-scale';
import {csv} from 'd3-fetch';
import {treemap, treemapResquarify, hierarchy} from 'd3-hierarchy';
import {schemePaired} from 'd3-scale-chromatic';
/* eslint-disable no-unused-vars */
// It is not necessary to use this function directly, but it is necessary for it to be present in the build
// Our build chain removes any unused libraries from the final output to the browser so we must explicitly
// import this here in order to make sure it is used.

// TLDR: dont use this, but make sure it stays here
import {transition} from 'd3-transition';
/* eslint-enable no-unused-vars */

// NO NEED TO EDIT THIS FUNCTION
domReady(() => {
  // this is the javascript fetch API, it uses a structure called a promise
  // to asyncronously make AJAX requests. Here we are using it acquire some data
  // that is being served by the gulp servelet.
  csv('./data/Reveal_EEO1_for_2016.csv').then(data => treeVis(data));
});

function groupBy(data, accesor) {
  return data.reduce((acc, row) => {
    if (!acc[row[accesor]]) {
      acc[row[accesor]] = [];
    }
    acc[row[accesor]].push(row);
    return acc;
  }, {});
}

function recursiveGroupBy(data, keys) {
  const grouping = groupBy(data, keys[0]);
  return Object.keys(grouping)
    .map(name => {
      if (keys.length > 1) {
        return {
          name,
          children: recursiveGroupBy(grouping[name], keys.slice(1))
        };
      }
      return {
        name,
        size: data.reduce((acc, row) => acc + Number(row.count), 0)
      };
    });
}

// this data set has the following categories
// 'company','year',"race",'gender','job_category','count'
const GROUP_BY = ['company', 'race'];
const COLOR_BY = GROUP_BY[GROUP_BY.length - 1];

function treeVis(data) {
  // first break apart the data into one series for each of the companies
  const height = 1000;
  const width = 1000;
  const margin = {top: 10, left: 10, right: 10, bottom: 10};
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const treemapEval = treemap()
    .tile(treemapResquarify)
    .size(plotWidth, plotHeight)
    .round(true)
    .paddingInner(0);

  const colorDomain = groupBy(data, COLOR_BY);
  const color = scaleOrdinal(schemePaired)
    .domain(colorDomain);

  const formattedTree = {
    name: 'root',
    children: recursiveGroupBy(data, GROUP_BY)
  };

  const root = hierarchy(formattedTree)
    .eachBefore(function addIds(d) {
      d.data.id = `${(d.parent ? `${d.parent.data.id}.` : '')}${d.data.name}`;
    })
    .sum(d => d.size)
    .sort((a, b) => (b.height - a.height || b.value - a.value));
  treemapEval(root);

  // PUT YOUR SELECT TYPE CODE HERE

  var svg = select('svg')
    .attr('width', width)
    .attr('height', height)

  var cell = svg.select('g')
    .data(root.leaves())
    .enter().append('g')
    .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

  console.log(root.leaves()[0])

  cell.append('rect')
    .attr('id', d => d.data.id)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => color(d.data.name));
}
