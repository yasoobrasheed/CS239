import React from 'react';
import {scaleLinear} from 'd3-scale';

import RadioButtonMenu from './radio-button-menu';
import {years} from './utils';
import {sortMeasles} from './utils';

class GridView extends React.Component {
  constructor(props) {
    super(props);
    // YOUR CODE HERE: you can pre-sort this.props.measlesRates (or rather a copy of it)
    // in the different possible ways, so that render() merely chooses amongst them
    const alpha = this.props.measlesRates;
    const meanSorted = sortMeasles(alpha.slice(0), 0);
    const maxSorted = sortMeasles(alpha.slice(0), 1);
    this.state = {
      sortBy: 'alphabetical',
      dataObj: {alphabetical: alpha, max: maxSorted, mean: meanSorted}
    };
  }

  state = {
    sortBy: 'alpha'
    // YOUR CODE HERE: null-initialization of pre-sorted data fields
  }

  selectRect(state, year, modifySelectedYear, modifySelectedUSST) {
    modifySelectedYear(year);
    modifySelectedUSST(state);
  }

  render() {
    // Yes, the non-responsive hard-coding of dimensions here is poor form
    const rectWidth = Math.floor(600 / years.length);
    const rectHeight = Math.floor(800 / 51);
    const abbrWidth = 30;
    const width = rectWidth * years.length;
    const height = rectHeight * 51;
    const {
      colorBy,
      colormapValue,
      colormapValueMinusMean,
      modifySelectedYear,
      modifySelectedUSST,
      selectedUSST,
      selectedYear
    } = this.props;
    const {
      sortBy,
      dataObj
    } = this.state;
    const xScale = scaleLinear().domain([0, years.length]).range([0, width]);
    const colormap = (colorBy === 'value' ? colormapValue : colormapValueMinusMean);
    // ACTUALLY this has to depend on sortBy
    const sortedRates = dataObj[sortBy];

    return (
      <div className="container" >
        <div className="containrow" >
        Sort rows:&nbsp;
        <RadioButtonMenu
            buttonValues={['alphabetical', 'mean', 'max']}
            currentValue={sortBy}
            onClick={value => this.setState({sortBy: value})}
            />
        </div>
        <svg width={`${abbrWidth + width}`} height={height}
        >
          {sortedRates.map((row, idx) => {
            return (
              <g className="row-container" transform={`translate(0,${idx * rectHeight})`}
                 key={idx} id={row.StateAbbr}>
                <text y={`${rectHeight * 0.8}`}>{row.StateAbbr}</text>
                <g className="year-container"
                   id={`${row.StateAbbr}`}
                   transform={`translate(${abbrWidth},0)`}>
                  {years.map((year, i) => {
                    return (<rect
                      onMouseOver={() => this
                        .selectRect(row.StateAbbr, year, modifySelectedYear, modifySelectedUSST)}
                      key={`${idx}-${i}`}
                      y="0"
                      id={`${year}`}
                      x={Math.round(xScale(i))}
                      fill={colormap(row[year])}
                      height={`${rectHeight}`}
                      width={`${rectWidth}`} />);
                  })}
                </g>
                <rect
                  y="0"
                  x={Math.round(xScale(0) + 30)}
                  height={`${rectHeight}`}
                  width={`${rectWidth * years.length}`}
                  fill="none"
                  stroke="blue"
                  strokeWidth={selectedUSST === row.StateAbbr ? '2' : '0'}
                  />
              </g>
            );
          })}
          <rect
            y="0"
            x={Math.round(xScale(years.indexOf(selectedYear)) + 30)}
            height={`${rectHeight * sortedRates.length}`}
            width={`${rectWidth}`}
            fill="none"
            stroke="blue"
            strokeWidth="2"
            />
        </svg>
      </div>
    );
  }
}

GridView.displayName = 'GridView';
export default GridView;
