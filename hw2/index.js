// this eslint command tells the linter that we have imported
// d3 in some logical way and not to worry about it
/* global d3 */

// This function generates an array of objects that you will work with in this
// assignment. I've written it in a particularly functional manner to highlight
// using the arrow syntax
const prepareData = () => ['A', 'B', 'C', 'D', 'E', 'F'].map((d, i) => ({
  cat: d,
  val: 0.25 + 9.75 * Math.pow(Math.random(), 1.5)
}));

// bindNewSvg is a HOF (Higher-Order Function) that takes in a number of
// properies and builds a function that will be appropriate from laying out
// the data and labels.
const bindNewSvg = (width, height, {left, right, top, bottom}, xScale, yScale) => {
  // this syntax variablename = value is an es6ish for setting defaults
  /* newSvg: creates a new 'svg' element inside 'body', sets up the X axis,
  and does various things with the Y axis.  This utility function is not
  likely to have an analog in other d3 code you write, because the purpose of
  this is to make many similar svg elements, whereas d3 code often creates a
  visualization within a single svg element */
  return function newSvg(label, ys = yScale) {
    // i.e. its a not a d3 scale
    const H = typeof ys !== 'function' ? ys : height;

    const preret = d3.select('body')
      .append('svg')
      .attr('id', 'avis')
      .attr('width', width + left + right)
      .attr('height', H + top + bottom);

    preret.append('text')
      .attr('class', 'label')
      .attr('transform', 'translate(10,13)')
      .attr('fill', '#000')
      .text(label);

    const ret = preret.append('g')
      .attr('transform', `translate(${left},${top})`);

    ret.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${H})`)
      .call(d3.axisBottom(xScale));

    // assume its a d3 scale
    if (typeof ys === 'function') {
      ret.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(ys));
    }
    return ret;
  };
};

// this is a listener that is attached to the root of the DOM,
// it waits until the DOM is ready to be intereacted with before running
document.addEventListener('DOMContentLoaded', () => {
  // begin by preparing the data that we will be using
  const data = prepareData();
  console.log('here is the data:', data);

  // next we want to setup good boundaries for our system to draw in
  // set up margins and X and Y scales (Y scales may not be used)
  const margin = {top: 30, right: 10, bottom: 20, left: 30};
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  // Next setup appropriate d3 scales, there will be two: one for x and one for y
  // x should be a band scale and y should be a linear scale
  const xScale = d3.scaleBand()
    .domain(['A', 'B', 'C', 'D', 'E', 'F'])
    .range([0, width])
    .padding(0.1);
  const yScale = d3.scaleLinear()
    .domain([10, 0])
    .range([0, height]);
  // next we will build a function capable of building the svg in the browser that we want
  const newSvg = bindNewSvg(width, height, margin, xScale, yScale);
  // here is an example of what we are looking for, this will draw a series of rectangles
  newSvg('rect')
    .selectAll('.bar')
    .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.cat))
      .attr('width', xScale.bandwidth())
      .attr('y', d => yScale(d.val))
      .attr('height', d => height - yScale(d.val));

  // draw scatter plot like circles
  newSvg('circle')
  .selectAll('.circle')
  .data(data)
  .enter().append('circle')
    .attr('class', 'circle')
    .attr('r', 10)
    .attr('cx', d => xScale(d.cat) + xScale.bandwidth() / 2)
    .attr('cy', d => yScale(d.val))
    .style('fill', '#5F9E9F');

  // draw bar chart like lines
  newSvg('line')
    .selectAll('.line')
    .data(data)
    .enter().append('line')
      .attr('class', 'line')
      .attr('x1', d => xScale(d.cat) + xScale.bandwidth() / 2)
      .attr('x2', d => xScale(d.cat) + xScale.bandwidth() / 2)
      .attr('y1', d => yScale(d.val))
      .attr('y2', height)
      .style('stroke', '#87CDF9')
      .style('stroke-width', 4);

  // draw ellipses
  const scaleEllipse = d3.scaleLinear()
    .domain([10, 0])
    .range([0, height / 2]);
  const ellipseSvg = bindNewSvg(width, height, margin, xScale, scaleEllipse);
  ellipseSvg('ellipse')
  .selectAll('.ellipse')
  .data(data)
  .enter().append('ellipse')
    .attr('class', 'ellipse')
    .attr('rx', d => xScale.bandwidth() / 2)
    .attr('ry', d => height / 2 - scaleEllipse(d.val))
    .attr('cx', d => xScale(d.cat) + xScale.bandwidth() / 2)
    .attr('cy', d => height / 2)
    .style('fill', '#AFC3DE');

  // draw rounded rects
  const scaleRectsThick = d3.scaleLinear()
    .domain([10, 0])
    .range([0, 100]);
  const yLessSvg = bindNewSvg(width, 0, margin, xScale, 155);
  yLessSvg('rounded rects')
  .selectAll('.bar')
  .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.cat))
    .attr('width', xScale.bandwidth())
    .attr('y', 40)
    .attr('height', xScale.bandwidth())
    .attr('rx', d => 100 - scaleRectsThick(d.val))
    .attr('ry', d => 100 - scaleRectsThick(d.val))
    .style('fill', '#41BEFE');

  // draw thickness varying circles
  yLessSvg('stroke thickness')
  .selectAll('.circle')
  .data(data)
  .enter().append('circle')
    .attr('class', 'circle')
    .attr('r', 0.3 * xScale.bandwidth())
    .attr('cx', d => xScale(d.cat) + xScale.bandwidth() / 2)
    .attr('cy', 75)
    .style('fill', 'white')
    .style('stroke', '#7F807F')
    .style('stroke-width', d => (100 - scaleRectsThick(d.val)) / 2);

  // draw hue varying circles
  const scaleHue = d3.scaleLinear()
    .domain([10, 0])
    .range([0, 300]);
  yLessSvg('Hue')
  .selectAll('.circle')
  .data(data)
  .enter().append('circle')
    .attr('class', 'circle')
    .attr('r', 50)
    .attr('cx', d => xScale(d.cat) + xScale.bandwidth() / 2)
    .attr('cy', 75)
    .style('fill', d => d3.hcl(300 - scaleHue(d.val), 40, 50));

  // draw Saturation varying circles
  const scaleSatLum = d3.scaleLinear()
    .domain([10, 0])
    .range([0, 80]);
  yLessSvg('Saturation')
  .selectAll('.circle')
  .data(data)
  .enter().append('circle')
    .attr('class', 'circle')
    .attr('r', 50)
    .attr('cx', d => xScale(d.cat) + xScale.bandwidth() / 2)
    .attr('cy', 75)
    .style('fill', d => d3.hcl(0, 80 - scaleSatLum(d.val), 50));

  // draw Luminance varying circles
  yLessSvg('Luminance')
  .selectAll('.circle')
  .data(data)
  .enter().append('circle')
    .attr('class', 'circle')
    .attr('r', 50)
    .attr('cx', d => xScale(d.cat) + xScale.bandwidth() / 2)
    .attr('cy', 75)
    .style('fill', d => d3.hcl(0, 10, 80 - scaleSatLum(d.val)));

}, false);
