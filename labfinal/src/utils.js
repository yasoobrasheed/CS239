import {pie, arc} from 'd3-shape';
import {COLORS} from './constants';

/**
 * Group input data and collect the sum of another key in the object
 * @param {Array of Objects} data - the data to be grouped against
 * @param {String} groupingKey - the key to group by
 * @param {String} summingKey - the key to sum by
 * @returns {Object} with keys consisting of groupingKey values
 * and values consisting of the sum of summing key values for that group
 */
export function sumByGroup(data, groupingKey, summingKey) {
  return data.reduce((accum, d) => {
    const val = d[groupingKey];
    const add = Number(d[summingKey]);
    if (accum[val]) {
      accum[val] += add;
    } else {
      accum[val] = add;
    }
    return accum;
  }, {});
}

/**
 * Builds rudimentary version of scaleLinear.
 * @param {Array of two numbers} domain - the domain of the data to be scaled
 * @param {Array of two numbers} range - the range of the data to be scaled
 * @returns {Function} the scaling function
 */
export function myScaleLinear(domain, range) {
  // YOUR CODE HERE
  return (x) => {
    return (x - domain[0]) / (domain[1] - domain[0]) * (range[1] - range[0]) + range[0];
  };
}

/**
 * Build a donut chart
 * @param {d3 selection object} svg - the svg node to insert your chart into
 * @param {Array of Objects} data - the data to be grouped against
 * @param {Object} layout - the parameters of the chart you are drawing
 */
export function yourChart(svg, data, layout) {
  const {height, width, innerRadius, outerRadius} = layout;

  svg.attr('transform', `translate(${width}, ${height})`);

  const chartArc = arc()
    .startAngle(0)
    //.endAngle(Math.PI / 6)
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const chartPie = pie()
    .value(d => d.population)
    .sort(null);

  const g = svg.selectAll('arc')
    .data(chartPie(data))
    .enter().append('g')
    .attr('class', 'arc');

  g.append('path')
    .attr('d', chartArc)
    .attr('height', d => d.height)
    .attr('fill', (d, i) => COLORS[i]);

  g.append('text')
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .text(d => d.name);
}
