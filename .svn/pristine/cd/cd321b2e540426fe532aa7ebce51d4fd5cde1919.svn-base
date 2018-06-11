import {rgb} from 'd3-color';
import {hsv} from 'd3-hsv';

export const COLOR_MODE_CONFIGURATIONS = {
  RGB: {
    colorSpace: rgb,
    bars: [
      {name: 'red', property: 'r', range: [0, 255]},
      {name: 'green', property: 'g', range: [0, 255]},
      {name: 'blue', property: 'b', range: [0, 255]}
    ]
  },
  HSV: {
    colorSpace: hsv,
    bars: [
      {name: 'hue', property: 'h', range: [0, 360]},
      {name: 'saturation', property: 's', range: [0, 1], stepSize: 0.01},
      {name: 'value', property: 'v', range: [0, 1], stepSize: 0.01}
    ]
  }
};

export const COLOR_MODES = Object.keys(COLOR_MODE_CONFIGURATIONS);
