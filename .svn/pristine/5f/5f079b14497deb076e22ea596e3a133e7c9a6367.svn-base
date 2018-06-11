import React from 'react';
import TapReactBrowser from 'tap-react-browser';
import {
  sumByGroupTest,
  myScaleLinearTest,
  pieChartTest
} from '../tests/final-tests';
import StudentComponentWrapper from './student-component';

class DemoComponent extends React.Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{margin: '10px'}}>
          <h3>EXPECTED OUTPUT</h3>
          {
            /* eslint-disable max-len */
          }
          <svg width="300" height="300">
            <g transform="translate(150, 150)">
              <path d="M-111.07672060611509,-67.54229889033277A130,130,0,0,1,-18.203197051629072,-128.7192433830294L-11.201967416387122,-79.21184208186426A80,80,0,0,0,-68.35490498837852,-41.564491624820164Z" fill="#ff9833"/>
              <path d="M7.960204194457796e-15,-130A130,130,0,1,1,-12.221996900957942,129.4241970875345L-7.521228862127964,79.64565974617508A80,80,0,1,0,4.898587196589413e-15,-80Z" fill="#ef5d28"/>
              <path d="M-12.221996900957942,129.4241970875345A130,130,0,0,1,-111.07672060611509,-67.54229889033277L-68.35490498837852,-41.564491624820164A80,80,0,0,0,-7.521228862127964,79.64565974617508Z" fill="#12939a"/>
              <path d="M-18.203197051629072,-128.7192433830294A130,130,0,0,1,-2.3880612583373385e-14,-130L-1.4695761589768237e-14,-80A80,80,0,0,0,-11.201967416387122,-79.21184208186426Z" fill="#79c7e3"/>
              <text x="-57.75976441040405" y="-87.68585755556377">
                18-24
              </text>
              <text x="104.88366766034108" y="4.941281019646983">
                25-44
              </text>
              <text x="-93.84395303224" y="47.09896473684673">
                45-64
              </text>
              <text x="-7.369464468096794" y="-104.74106641357753">
                ≥65
              </text>
            </g>
          </svg>
          {
            /* eslint-enable max-len */
          }
        </div>
        <div style={{margin: '10px'}}>
          <h3>YOUR OUTPUT</h3>
          <StudentComponentWrapper />
        </div>
      </div>
    );
  }
}

class TestHarness extends React.Component {
  render() {
    return (
      <div>
        <h1>CMSC 239 DATA VISUALIZATION - IN LAB FINAL</h1>
        <TapReactBrowser
          runAsPromises
          onComplete={tests => {
            // put total test results somewhere puppet can pick them up
            document.TapReactBrowserTestResults = tests;
          }}
          tests={[
            sumByGroupTest,
            myScaleLinearTest,
            pieChartTest
          ]}
          >
          <DemoComponent/>
        </TapReactBrowser>
      </div>
    );
  }
}
TestHarness.displayName = 'TestHarness';
export default TestHarness;
