/* global d3 */

document.addEventListener('DOMContentLoaded', () => {
  // Boundaries of our diagram
  const height = 600;
  const width = 600;
  const margin = {top: 75, left: 75, right: 75, bottom: 75};

  // First create a pair of scales, call them x and y
  const X_SCALE = d3.scaleLinear().domain([-1, 1]).range([0, width]);
  const Y_SCALE = d3.scaleLinear().domain([-1, 1]).range([0, height]);
  // Create the ticks
  var svgContainer = d3.select(".vis-container").append("svg")
    .attr("width", 600)
    .attr("height", 600);
  const tickData = [...new Array(24 * 4)].map((d, i) => i);
  var ticks = svgContainer.selectAll("line")
    .data(tickData)
    .enter().append("line")
    .attr("x1", d => X_SCALE(Math.cos( d / 96 * (2 * Math.PI))))
    .attr("x2", d => X_SCALE(0.9 * Math.cos( d / 96 * (2 * Math.PI))))
    .attr("y1", d => Y_SCALE(Math.sin( d / 96 * (2 * Math.PI))))
    .attr("y2", d => Y_SCALE(0.9 * Math.sin( d / 96 * (2 * Math.PI))))
    .attr("stroke", "black");

  // Create the labels
  function make_label(label) {
    if (label % 4 != 0) {
      return null;
    } else {
      return (label / 4);
    }
  }

  var labels = svgContainer.selectAll('label')
    .data(tickData)
    .enter().append('text')
    .attr('x', d => X_SCALE(Math.cos(Math.PI * 2 * d / 96)))
    .attr('y', d => Y_SCALE(Math.sin(Math.PI * 2 * d / 96)))
    .text(d => make_label(d))
    .style('fill', 'black');

  let angle = 0;
  const hand = svgContainer.append('line')
    .attr('x1', X_SCALE(0))
    .attr('y1', Y_SCALE(0))
    .attr('class', 'hand')
    .attr('stroke', '#f00')
    .attr('stroke-width', 10)
    .attr('stroke-linecap', 'round');
  movehand();
  function movehand() {
    angle += 0.1;
    angle = angle > Math.PI * 2 ? 0 : angle;
    hand
      .attr('class', 'hand')
      .transition()
      .duration(100)
      .attr('x2', X_SCALE(0.4 * Math.cos(angle)))
      .attr('y2', Y_SCALE(0.4 * Math.sin(angle)))
      .on('end', movehand);
  }

});
