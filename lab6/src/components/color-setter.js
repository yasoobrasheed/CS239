import React from 'react';
import Slider from './slider';
import {COLOR_MODE_CONFIGURATIONS} from '../constants';

class ColorSetter extends React.Component {
  render() {
    const {colorMode, currentColor, onColorChange} = this.props;

    const {bars, colorSpace} = COLOR_MODE_CONFIGURATIONS[colorMode];
    const colorComponents = colorSpace(currentColor);
    const colorComponentsAsArray = bars.map(bar => colorComponents[bar.property]);
    return (
      <div className="container pad-only-sides">
        {bars.map(({name, property, range, stepSize}, idx) => {
          return (<Slider
            value={colorComponentsAsArray[idx]}
            range={range}
            stepSize={stepSize}
            onChange={value => {
              const updatedColorComponents = colorComponentsAsArray.map((val, i) => i === idx ? value : val);
              const newColor = colorSpace(...updatedColorComponents);
              onColorChange(newColor);
            }}
            sliderName={name}
            key={idx}/>);
        })}
      </div>
    );
  }
}
ColorSetter.displayName = 'ColorSetter';
export default ColorSetter;
