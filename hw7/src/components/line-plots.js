import React from 'react';
import ReactDOM from 'react-dom';
import {line} from 'd3-shape';
import {scaleLinear, scaleTime} from 'd3-scale';
import {axisLeft, axisBottom} from 'd3-axis';
import {select} from 'd3-selection';

import {years, findRate} from './utils';

class LinePlots extends React.Component {
  constructor(props) {
    super(props);
    // Note that these values are initialized via .defaultProps below
    const {
      measlesRates,
      width,
      height,
      margin,
      meanRate
    } = this.props;
    // Creating/computing things that will never change,
    // especially stuff involving traversing all the data multiple times
    meanRate.StateAbbr = 'avg';
    measlesRates.push(meanRate);
    const xScale = scaleTime()
      .domain([new Date('1930'), new Date('2016')])
      .range([margin.left, margin.left + (width - margin.left - margin.right)]);
    const yearWidth = xScale(new Date('1')) - xScale(new Date('0'));
    const xAxis = axisBottom(xScale).tickFormat(d => d.getFullYear());
    const plotHeight = height - margin.top - margin.bottom;
    const reformatedData = measlesRates.map(row =>
        ({StateAbbr: row.StateAbbr,
          StateData: years.map(year => ({date: new Date(`${year}`), value: row[year]}))})
    );
    // YOUR CODE HERE: pre-compute once any other re-arrangements of data,
    // or any objects that depend on data.
    // This is the one place state is not set via setState
    this.state = {
      xScale,
      yearWidth,
      xAxis,
      plotHeight,
      reformatedData
      // YOUR CODE HERE: any other pre-computed data re-arrangements?
    };
  }

  state = {
    xScale: null,
    yearWidth: null,
    xAxis: null,
    plotHeight: null,
    reformatedData: null
  }

  componentDidMount() {
    const {
      xAxis,
      plotHeight
    } = this.state;
    select(ReactDOM.findDOMNode(this.refs.xAxisContainer))
      .call(axisG => axisG.call(xAxis))
      .attr('transform', `translate(0, ${plotHeight})`);
    this.updateChart(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps);
  }

  handleClick(abbr) {
    // console.log('hi');
    if (abbr !== 'avg') {
      this.props.modifySelectedUSST(abbr);
    }
  }

  changeYear(xCoor) {
    const date = this.state.xScale.invert(xCoor);
    const year = date.getFullYear();
    this.props.modifySelectedYear(year - 100);

  }

  mapColor(abbr) {
    if (abbr === 'avg') {
      return 'orange';
    } else if (abbr === this.props.selectedUSST) {
      return 'blue';
    }
    return 'gray';
  }

  updateChart(props) {
    const {
      measlesRates,
      selectedYear
    } = props;
    const {
      xScale,
      plotHeight,
      reformatedData
    } = this.state;
    if (!measlesRates.length) {
      return;
    }
    // YOUR CODE HERE: make yScale respond usefully to selectedYear.
    // If the Y scaling that depends on selectedYear hasn't actually changed
    // then this can return early

    let yScale = scaleLinear().domain([110000, 0]).range([0, plotHeight]);
    if (selectedYear >= 1965 && selectedYear <= 1995) {
      yScale = scaleLinear().domain([110000 / 20, 0]).range([0, plotHeight]);
    } else if (selectedYear >= 1995) {
      yScale = scaleLinear().domain([110000 / 2560, 0]).range([0, plotHeight]);
    }

    this.setState({
      yScale
    });

    // build axes
    const yAxis = axisLeft(yScale);
    select(ReactDOM.findDOMNode(this.refs.yAxisContainer))
      .call(axisG => axisG.call(yAxis));

    // build lines
    const lineContainer = select(ReactDOM.findDOMNode(this.refs.plotContainer));
    const lineEval = line().x(d => xScale(d.date)).y(d => yScale(d.value));
    const lines = lineContainer.selectAll('.state-line').data(reformatedData);
    lines
      .enter().append('path')
      .attr('class', 'state-line')
      .attr('stroke', d => this.mapColor(d.StateAbbr))
      .attr('stroke-width', '2')
      .attr('fill', 'none')
      .attr('id', d => d.StateAbbr)
      .attr('opacity', d => (d.StateAbbr === 'avg' || d.StateAbbr === this.selectedUSST) ? 1 : 0.3)
      .merge(lines)
      .attr('d', d => lineEval(d.StateData))
      .on('click', d => this.handleClick(d.StateAbbr));

    // ACTUALLY if you've added more local state, call this.setState() on any changed state
  }

  render() {
    const {
      height,
      margin,
      selectedYear,
      selectedUSST,
      width
    } = this.props;
    const {
      xScale,
      yearWidth
    } = this.state;

    /*
    function test2() {
      console.log('OMAR');
    }
    */

    const lineContainer = select('.plot-container');
    lineContainer.selectAll('.state-line').attr('stroke', 'gray');
    lineContainer.select(`#${ selectedUSST}`).attr('stroke', 'blue');
    lineContainer.select('#avg').attr('stroke', 'orange');
    const selectedRate = findRate(selectedUSST, selectedYear, this.props.measlesRates);
    const urlLink = `https://www.google.com/search?q=measles+
                      ${this.props.selectedYear}+${this.props.selectedState}`;
    // YOUR CODE HERE any other values useful below
    return (
      <div className="container relative">
        <div> {'Measles cases per million people (natl. avg. = orange)'} </div>
        <svg width={width} height={height} onClick={(e) => this.changeYear(e.clientX)}>
        >
          <g
            transform={`translate(${xScale(new Date(`${selectedYear}`))})`}>
            <rect
              x={-yearWidth / 2}
              y={0}
              width={yearWidth}
              height={height - margin.top - margin.bottom}
              fill="#ff7"
              />
          </g>
          <g className="plot-container"
            ref="plotContainer"
            />
          <g className="axis-container x-axis"
            ref="xAxisContainer"
            />
          <g className="axis-container y-axis"
            transform={`translate(${margin.left})`}
            ref="yAxisContainer"
            />
        </svg>
        <div>Tooltip:
          <a href={urlLink} rel="noopener noreferrer" target="_blank">
            {this.props.selectedYear} {this.props.selectedUSST} {selectedRate.toFixed(2)}</a>
        </div>
      </div>
    );
  }
}

LinePlots.displayName = 'LinePlots';
LinePlots.defaultProps = {
  // Yes, the non-responsive hard-coding of dimensions here is poor form
  width: 550,
  height: 400,
  margin: {left: 42, right: 5, top: 10, bottom: 10}
};
export default LinePlots;
