import React from 'react';
import Plx from 'react-plx';

import preview from './pics/Group-1054.svg';


const parallaxData = [
  {
    start: '.first-trigger',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview3-trigger',
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
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
  {
    start: '.preview3-trigger',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview3-trigger-end',
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
  },
  {
    start: '.preview3-trigger-end',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview3-trigger',
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

export default class Preview3 extends React.Component {
  render() {
    return (
      <Plx
        className='StickyText sticky3'
        parallaxData={ parallaxData }
      >
        <img
              className="parallax-header_logo logo3"
              src={preview}
              alt="header-logo"
            ></img>
      </Plx>
    );
  }
}