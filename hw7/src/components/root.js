import React from 'react';
import GridView from './grid-view';
import LinePlots from './line-plots';
import HexMap from './hex-map';
import RadioButtonMenu from './radio-button-menu';

import {csv} from 'd3-fetch';
import {calculateRates, calculateUSMeanRate,
  buildColormapValue, buildColormapValueMinusMean} from './utils';

class RootComponent extends React.Component {
  state = {
    loading: true,
    hexData: [],
    measlesRates: [],
    meanRate: {},
    colorBy: 'value',
    colormapValue: null,
    colormapValueMinusMean: null,
    selectedYear: 1945,
    selectedUSST: 'AL'
  }

  componentWillMount() {
    Promise.all([
      // order matters & is preserved by the promise.all
      csv('data/hexmap.csv'),
      csv('data/population_1930_2010.csv'),
      csv('data/measles_1930_2016.csv')
    ]).then(data => {
      const rates = calculateRates(data[2], data[1]);
      this.setState({
        hexData: data[0],
        loading: false,
        measlesRates: rates,
        meanRate: calculateUSMeanRate(rates, data[1]),
        colormapValue: buildColormapValue(),
        colormapValueMinusMean: buildColormapValueMinusMean()
      });
    });
  }

  render() {
    const {
      colorBy,
      colormapValue,
      colormapValueMinusMean,
      hexData,
      loading,
      meanRate,
      measlesRates,
      selectedYear,
      selectedUSST
    } = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }

    return (
      <div className="flex">
        <GridView
          colorBy={colorBy}
          colormapValue={colormapValue}
          colormapValueMinusMean={colormapValueMinusMean}
          measlesRates={measlesRates}
          selectedYear={selectedYear}
          modifySelectedYear={year => this.setState({selectedYear: year})}
          selectedUSST={selectedUSST}
          modifySelectedUSST={USST => this.setState({selectedUSST: USST})}
          />
        <div className="container">
          <div className="containrow">
            Colormap:&nbsp;
            <RadioButtonMenu
              buttonValues={['value', 'value-mean']}
              currentValue={colorBy}
              onClick={value => this.setState({colorBy: value})}
              />
          </div>
          <HexMap
            colorBy={colorBy}
            colormapValue={colormapValue}
            colormapValueMinusMean={colormapValueMinusMean}
            hexData={hexData}
            selectedYear={selectedYear}
            selectedUSST={selectedUSST}
            modifySelectedUSST={USST => this.setState({selectedUSST: USST})}
            measlesRates={measlesRates} />
          <LinePlots
            measlesRates={measlesRates}
            meanRate={meanRate}
            selectedYear={selectedYear}
            modifySelectedYear={year => this.setState({selectedYear: year})}
            selectedUSST={selectedUSST}
            modifySelectedUSST={USST => this.setState({selectedUSST: USST})} />
        </div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
