import React from 'react';
import {csv} from 'd3-fetch';
import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {interpolateWarm} from 'd3-scale-chromatic';
import {
  XYPlot,
  LineSeries,
  LabelSeries,
  XAxis,
  Voronoi,
  Hint
} from 'react-vis';
import debounce from 'debounce';

import {updateData, getDataDomain} from '../utils';
import {desiredLabels} from '../constants';

const HEIGHT = 1000;
const WIDTH = 800;
const MARGIN = {left: 20, right: 200, bottom: 100, top: 20};

function buildVoronoiPoints(data) {
  return data.reduce((acc, {player, pname, year, gameData}) => {
    return acc.concat({
      player,
      pname,
      year,
      x: 41,
      y: gameData[gameData.length - 1].y
    });
  }, []);
}

class RootComponent extends React.Component {
  state = {
    data: null,
    loading: true,
    highlightSeries: null,
    highlighTip: null
  }

  componentWillMount() {
    this.debouncedSetState = debounce(newState => this.setState(newState), 40);

    csv('data/nyt-rip.csv')
      .then(data => {
        const updatedData = updateData(data);
        const playerYearMap = updatedData.reduce((acc, row) => {
          acc[`${row.pname}-${row.year}`] = row.gameData[row.gameData.length - 1].y;
          return acc;
        }, {});

        const playerMap = updatedData.reduce((acc, row) => {
          acc[`${row.pname}-${row.year}`] = row;
          return acc;
        }, {});
        this.setState({
          data: updatedData,
          loading: false,
          allPoints: buildVoronoiPoints(updatedData),
          playerYearMap,
          playerMap
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading !== prevState.loading) {
      this.drawCanvasLines(this.props, this.state);
    }
  }

  drawCanvasLines(props, state) {
    const {data} = state;
    // set up scales as appropriate
    const x = scaleLinear().domain([0, 82]).range([MARGIN.left, WIDTH - MARGIN.right]);
    const y = scaleLinear().domain([0, 405]).range([HEIGHT - MARGIN.bottom, MARGIN.top]);
    // create a mapping between the domain and the the selected color scheme
    const dataDomain = getDataDomain(data);
    const domainScale = scaleLinear().domain(dataDomain).range([1, 0]);
    const colorScale = val => interpolateWarm(domainScale(val));

    // draw on the cavnas using d3's line
    const canvas = this.refs.lines;
    const ctx = canvas.getContext('2d');
    const lineEval = line().x(d => x(d.x)).y(d => y(d.y)).context(ctx);
    data.forEach(player => {
      ctx.beginPath();
      lineEval(player.gameData);
      ctx.strokeStyle = colorScale(player.gameData[player.gameData.length - 1].y);
      ctx.strokeOpacity = 0.7;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  render() {
    const {loading, highlightSeries, allPoints, playerYearMap, playerMap, highlighTip} = this.state;

    const x = scaleLinear().domain([0, 82]).range([MARGIN.left, WIDTH - MARGIN.right]);
    const y = scaleLinear().domain([0, 405]).range([HEIGHT - MARGIN.top - MARGIN.bottom, 0]);
    return (
      <div className="relative">
        {loading && <h1>LOADING</h1>}
        <canvas ref="lines" className="absolute" width={WIDTH} height={HEIGHT}/>
        {!loading && <XYPlot
          xDomain={[0, 82]}
          yDomain={[0, 406]}
          width={WIDTH}
          height={HEIGHT}
          margin={MARGIN}>
          <LabelSeries
            labelAnchorX="start"
            data={desiredLabels.map(row => ({
              ...row,
              y: playerYearMap[`${row.pname}-${row.year}`],
              yOffset: -12
            }))}
            style={{fontSize: '10px', fontFamily: 'sans-serif'}}
            getX={d => 82}
            getY={d => d.y}
            getLabel={d => `${d.pname.toUpperCase()}, ${d.year}`}/>
          <XAxis
            tickFormat={d => !d ? '1st game' : (!(d % 10) ? `${d}th` : '')}/>
          {highlightSeries && <LineSeries
              animation
              curve=""
              data={highlightSeries}
              color="black"/>}
          {
            highlighTip && <Hint
              value={{y: highlighTip.y, x: 82}}
              align={{horizontal: 'right'}}>
              {`${highlighTip.name} ${highlighTip.y}`}
            </Hint>
          }

          <Voronoi
            extent={[[0, y(405)], [WIDTH, HEIGHT - MARGIN.bottom]]}
            nodes={allPoints}
            polygonStyle={{
              // UNCOMMENT BELOW TO SEE VORNOI
              // stroke: 'rgba(0, 0, 0, .2)'
            }}
            onHover={row => {
              const player = playerMap[`${row.pname}-${row.year}`];
              this.debouncedSetState({
                highlightSeries: player.gameData,
                highlighTip: {
                  y: player.gameData[player.gameData.length - 1].y,
                  name: row.pname
                }
              });
            }}
            x={d => x(d.x)}
            y={d => y(d.y)}
            />
        </XYPlot>}
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
