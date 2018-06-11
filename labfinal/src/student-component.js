import React from 'react';
import ReactDOM from 'react-dom';
import {select} from 'd3-selection';

import {yourChart} from './utils';
import {layout, EXAMPLE_DATA} from './constants';

class TestHarness extends React.Component {
  componentDidMount() {
    this.updateChart();
  }

  updateChart() {
    const svg = select(ReactDOM.findDOMNode(this.refs.finalChart));
    yourChart(svg, EXAMPLE_DATA, layout);
  }

  render() {
    const {width, height} = layout;
    return (
      <div className="relative student-component">
        <svg width={width} height={height} ref="finalChart"/>
      </div>
    );
  }
}
TestHarness.displayName = 'TestHarness';
export default TestHarness;
