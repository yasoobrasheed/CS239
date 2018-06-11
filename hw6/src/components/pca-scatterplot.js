import React from 'react';
import {scaleLinear} from 'd3-scale';

import {PCA_COLUMNS_COLORS} from '../constants';

const MARGIN = {left: 10, top: 10, right: 10, bottom: 10};
const WIDTH = 400;
const HEIGHT = 400;

function to8bit(v) {
  const i = Math.round(256 * v - 0.5);
  return i < 0 ? 0 : (i > 255 ? 255 : i);
}

class PcaScatterplot extends React.Component {
  state = {
    hoveredState: null
  }
  componentDidMount() {
    this.updateColorMap(this.props);
  }

  componentDidUpdate() {
    this.updateColorMap(this.props);
  }

  updateColorMap(props) {
    const {colorMap} = props;
    const x = scaleLinear().range([-1.1, 1.1]).domain([0, WIDTH]);
    const y = scaleLinear().range([-1.1, 1.1]).domain([0, HEIGHT]);

    const canvas = this.refs.cmapDisplay;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    // change color
    // The one time you'll see us using a for loop in the class.
    // necessary because we can't get away cloning this data of how large it is
    // (width * height * 4) aint small for the browser
    /* eslint-disable no-loops/no-loops */
    for (let idx = 0; idx < imgData.data.length; idx += 4) {
      const xVal = x((idx / 4) % WIDTH);
      const yVal = y(Math.floor((idx / 4) / WIDTH));
      const {r, g, b} = colorMap(xVal, yVal);
      imgData.data[idx + 0] = to8bit(r / 255);
      imgData.data[idx + 1] = to8bit(g / 255);
      imgData.data[idx + 2] = to8bit(b / 255);
      imgData.data[idx + 3] = 255;
    }
    /* eslint-enable no-loops/no-loops */
    ctx.putImageData(imgData, 0, 0);
  }

  render() {
    const {hoveredState} = this.state;
    const {selectedStates, pcaData, onClick, originalData} = this.props;

    const plotHeight = HEIGHT - MARGIN.left - MARGIN.right;
    const plotWidth = WIDTH - MARGIN.left - MARGIN.right;
    // using [-1.08,1.08] instead of [1,1] to keep state IDs inside box,
    // (though possibly creating small difference between map and
    // scatterplot colors)
    const x = scaleLinear().domain([-1.08, 1.08]).range([0, plotWidth]);
    const y = scaleLinear().domain([-1.08, 1.08]).range([plotHeight, 0]);
    return (
      <div className="flex">
        <svg width={WIDTH} height={HEIGHT} className="pca-scatterplot">
          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            {
              // draw the back ground axes
            }
            <line x1={x(-2)} x2={x(2)} y1={y(0)} y2={y(0)} stroke="black" strokeOpacity="0.2"/>
            <line x1={x(0)} x2={x(0)} y1={y(-2)} y2={y(2)} stroke="black" strokeOpacity="0.2"/>
            {
              // draw the basis vectors
            }
            {pcaData.basisVectors.map((row, idx) => {
              return (
                <line
                  key={idx}
                  stroke={PCA_COLUMNS_COLORS[row[2]]}
                  onMouseOver={() => this.setState({
                    hoveredState: [row[0] / 2, row[1] / 2, row[2]]
                  })}
                  onMouseLeave={() => this.setState({hoveredState: null})}
                  strokeWidth="6"
                  x1={x(0)}
                  x2={x(row[0])}
                  y1={y(0)}
                  y2={y(row[1])}/>
              );
            })}
            {
              // draw the state values as scatterplot dots
            }
            {pcaData.dataProjected.map((row, idx) => {
              const state = originalData[idx].StateCode;
              return (<circle
                onClick={() => onClick(state)}
                onMouseOver={() => this.setState({hoveredState: [row[0], row[1], state]})}
                onMouseLeave={() => this.setState({hoveredState: null})}
                key={idx}
                r="5"
                fill={selectedStates[state] ? '#f33' : '#888'}
                fillOpacity={selectedStates[state] ? '0.6' : '0.2'}
                stroke="black"
                cx={x(row[0])}
                cy={y(row[1])}/>);
            })}
            {
              // if applicable draw the hover tip
            }
            {hoveredState && <g
              transform={`translate(${x(hoveredState[0])},${y(hoveredState[1])})`}>
              <text x="0" y="0" fill="#f00">{hoveredState[2]}</text>
            </g>
            }
          </g>
        </svg>
        <canvas width={WIDTH} height={HEIGHT} ref="cmapDisplay"/>
      </div>
    );
  }
}
PcaScatterplot.displayName = 'PcaScatterplot';
export default PcaScatterplot;
