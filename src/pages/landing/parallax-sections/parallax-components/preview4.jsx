import React from 'react';
import Plx from 'react-plx';

import preview from './pics/Group-1055.svg';


const parallaxData = [
  {
    start: '.first-trigger',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview4-trigger',
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
    start: '.preview4-trigger',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview4-trigger-end',
    properties: [
      {
        startValue: 0,
        endValue: -45,
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
    start: '.preview4-trigger-end',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview4-trigger',
    properties: [
      {
        startValue: -45,
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

export default class Preview4 extends React.Component {
  render() {
    return (
      <Plx
        className='StickyText sticky4'
        parallaxData={ parallaxData }
      >
        <img
              className="parallax-header_logo logo4"
              src={preview}
              alt="header-logo"
            ></img>
      </Plx>
    );
  }
}