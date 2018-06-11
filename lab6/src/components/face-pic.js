import React from 'react';
import {rgb} from 'd3-color';

function to8bit(v) {
  const i = Math.round(256 * v - 0.5);
  return i < 0 ? 0 : (i > 255 ? 255 : i);
}

class FacePic extends React.Component {
  componentDidMount() {
    this.updateFace(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateFace(props);
  }

  updateFace(props) {
    const {color, width, height, kValue} = props;
    const canvas = this.refs.face;
    const img = this.refs.pic;
    const ctx = canvas.getContext('2d');
    const {r, g, b} = rgb(color);
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, width, height);
    // change color
    const grayValue = to8bit(kValue);
    const redValue = to8bit(r / 255);
    const greenValue = to8bit(g / 255);
    const blueValue = to8bit(b / 255);
    // The one time you'll see us using a for loop in the class.
    // necessary because we can't get away cloning this data bc of how large it is
    // (width * height * 4) floats aint small for the browser
    /* eslint-disable no-loops/no-loops */
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i] > 127) {
        imgData.data[i + 0] = redValue;
        imgData.data[i + 1] = greenValue;
        imgData.data[i + 2] = blueValue;
        imgData.data[i + 3] = 255;
      } else {
        imgData.data[i + 0] = grayValue;
        imgData.data[i + 1] = grayValue;
        imgData.data[i + 2] = grayValue;
        imgData.data[i + 3] = 255;
      }
    }
    /* eslint-enable no-loops/no-loops */
    ctx.putImageData(imgData, 0, 0);
  }

  render() {
    const {width, height} = this.props;
    return (
      <div className="image-container">
        <canvas ref="face" width={width} height={height}/>
        <img
          src="dface.png"
          ref="pic"
          onLoad={() => this.updateFace(this.props)}
          onChange={() => this.updateFace(this.props)}
          width={width}
          height={height}/>
      </div>
    );
  }
}
FacePic.displayName = 'FacePic';
export default FacePic;
