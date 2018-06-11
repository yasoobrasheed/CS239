import React from 'react';
import {COLOR_MODES} from '../constants';

class ColorSchemePicker extends React.Component {
  render() {
    const {colorMode, onChange} = this.props;
    return (
      <div className="center pill-box pad-only-sides">
        {COLOR_MODES.map((mode, idx) => {
          return (<div
            className={`color-mode-button ${mode === colorMode ? 'selected' : ''}`}
            onClick={() => onChange(mode)}
            key={idx}>{mode}</div>);
        })}
      </div>
    );
  }
}
ColorSchemePicker.displayName = 'ColorSchemePicker';
export default ColorSchemePicker;
