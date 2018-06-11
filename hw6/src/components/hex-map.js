import React from 'react';
import {csv} from 'd3-fetch';

class HexMap extends React.Component {
  state = {
    hexes: []
  }

  componentWillMount() {
    csv('data/hexmap.csv').then(hexes => this.setState({hexes}));
  }

  render() {
    const {hexes} = this.state;
    const {selectedStates, width, onClick, stateColors} = this.props;
    const hexWidth = width / 13;

    return (
      <svg width={width} height={width * 0.6}>
        {hexes.map((row, idx) => {
          const scaling = 0.95;
          const hexRow = Number(row.HexRow);
          const hexCol = Number(row.HexCol);
          // (x,y) center of hexagon, given location in hex grid
          // variables to simplify tracing hexagon corners
          const dx = scaling * hexWidth / 2;
          const HY = scaling * hexWidth / Math.sqrt(3);
          const dy = HY / 2;
          const pos = [
            hexWidth * (-2 + hexCol + 0.5 * hexRow),
            1 + hexWidth * (-0.3 + 0.5 * Math.sqrt(3) * hexRow)
          ];
          // traverse vertices of hexagon centered at 0,0
          const constructedPath = `M${(-dx)},${dy}
            l${dx},${dy}
            l${dx},${-dy}
            l0,${-HY}
            l${-dx},${-dy}
            l${-dx},${dy} Z
            `;
          const highlightState = selectedStates[row.StateAbbr];

          return (
            <g
              onClick={() => onClick(row.StateAbbr)}
              transform={`translate(${pos[0]}, ${pos[1]})`}
              className="state-hex"
              key={idx}>
              <path
                fill={stateColors[row.StateAbbr] || '#ddd'}
                stroke={highlightState ? '#111' : '#ddd'}
                strokeWidth="2"
                d={constructedPath} />
              <text
                className={`state-hex-label ${highlightState ? 'selected' : ''}`}
                >{row.StateAbbr}</text>
            </g>);
        })}
      </svg>
    );
  }
}
HexMap.displayName = 'HexMap';
export default HexMap;
