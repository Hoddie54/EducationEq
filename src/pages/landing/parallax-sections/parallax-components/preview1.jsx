import React from 'react';
import Plx from 'react-plx';

import preview from './pics/Group-1051.svg';


const parallaxData = [
  {
    start: '.first-trigger',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview1-trigger-end',
    properties: [
      {
        startValue: 0,
        endValue: 0,
        unit: 'vh',
        property: 'translateY',
      },
      {
        startValue: 100,
        endValue: 100,
        unit: 'vh',
        property: 'translateX',
      },
      {
        startValue: 1,
        endValue: 0,
        property: 'opacity',
      },
    ],
  },{
    start: '.preview1-trigger-end',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.first-trigger',
    properties: [
      {
        startValue: 0,
        endValue: 0,
        unit: 'vh',
        property: 'translateY',
      },
      {
        startValue: 100,
        endValue: 100,
        unit: 'vh',
        property: 'translateX',
      },
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];

export default class Preview extends React.Component {
  render() {
    return (
      <Plx
        className='StickyText sticky1'
        parallaxData={ parallaxData }
      >
        <img
              className="parallax-header_logo logo1"
              src={preview}
              alt="header-logo"
            ></img>
      </Plx>
    );
  }
}