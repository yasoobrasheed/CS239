import React from 'react';
import {findDOMNode} from 'react-dom';

import ColorSetter from './color-setter';
import ColorSchemePicker from './color-scheme-picker';
import FacePic from './face-pic';
import Slider from './slider';

import {COLOR_MODES} from '../constants';

class RootComponent extends React.Component {
  state = {
    colorMode: COLOR_MODES[0],
    currentColor: '#f0f',
    kValue: 1
  }

  render() {
    const {colorMode, currentColor, kValue} = this.state;
    return (
      <div className="container center">
        <div className="title center">Face Based Luminance Matching</div>
        <div className="flex flex-vert">
          <div className="description">
            The luminance difference between the color and the gray determines whether
            you see a face on the left or right side.
            The luminances are matched when the two sides have equally indistinct faces.
            This can be used to assess or modify luminance variation in color sequences
            (for you on this display).
            Based on a <a href="http://people.cs.uchicago.edu/~glk/pubs/#VIS-2002">VIS 2002</a> paper.
          </div>
          <div className="flex">
            <div className="controls-container">
              <ColorSchemePicker
                colorMode={colorMode}
                onChange={newMode => this.setState({colorMode: newMode})}/>
              <ColorSetter
                colorMode={colorMode}
                currentColor={currentColor}
                onColorChange={newColor => this.setState({currentColor: newColor})}/>
              <div className="container pad-only-sides">
                <Slider value={kValue} range={[0, 1]} stepSize={0.01}
                  onChange={value => this.setState({kValue: value})}
                  sliderName={'gray'} />
              </div>
              <div className="pad-only-sides">
                {
                  // this is the file uploader, it has a lot of things going on!
                  // It makes use of the File type of input, which does most of the work
                }
                <input
                  type="File"
                  name="upload"
                  onChange={({target: {files}}) => {
                    // When an upload event is triggered, we build a new file reader
                    // load up the file we used and set it as the background of the picture
                    // that the face-pic component uses to draw it's base image.
                    if (files && files[0]) {
                      const reader = new FileReader();
                      // while refs are quite useful, they are pretty advanced,
                      // so don't worry if you don't get them
                      reader.onload = e =>
                        findDOMNode(this.refs.facePicWrapper.refs.pic)
                          .setAttribute('src', e.target.result);
                      reader.readAsDataURL(files[0]);
                    }
                  }}
                  />
              </div>
            </div>
            <div>
              <FacePic
                ref="facePicWrapper"
                color={currentColor}
                kValue={kValue}
                width={500}
                height={500}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
