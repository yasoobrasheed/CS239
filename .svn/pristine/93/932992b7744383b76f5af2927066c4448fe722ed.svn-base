import React from 'react';
import {csv} from 'd3-fetch';
import {scaleLinear} from 'd3-scale';
import {interpolateWarm} from 'd3-scale-chromatic';
import {
  XYPlot,
  LineSeries,
  LabelSeries,
  XAxis,
  Crosshair
} from 'react-vis';
import debounce from 'debounce';

import {updateData, getDataDomain, filterDataToLabels} from '../utils';

class RootComponent extends React.Component {
  state = {
    data: null,
    loading: true,
    highlightSeries: null,
    crossvalue: null
  }

  componentWillMount() {
    this.debouncedSetState = debounce(newState => this.setState(newState), 40);

    csv('data/nyt-rip.csv')
      .then(data => {
        const updatedData = updateData(filterDataToLabels(data));

        this.setState({
          data: updatedData,
          loading: false
        });
      });
  }

  render() {
    const {loading, highlightSeries, data, crossvalue} = this.state;

    const height = 1000;
    const width = 800;
    const margin = {left: 20, right: 200, bottom: 100, top: 20};

    // COLOR SCALE HERE

    return (
      <div className="relative">
        {loading && <h1>LOADING</h1>}
        {!loading && <div>YOUR CHART HERE</div>}
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
