import React from 'react';
import Plx from 'react-plx';

import preview from './pics/Group-1051.svg';

const parallaxData = [
  {
    start: '.first-trigger',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.preview4-trigger',
    properties: [
      {
        startValue: -20,
        endValue: -20,
        unit: 'vh',
        property: 'translateY',
      },
      {
        startValue: -20,
        endValue: -20,
        unit: 'vh',
        property: 'translateX',
      },
      {
        startValue: 1,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },{
    start: '.preview4-trigger',
    startOffset: '60vh',
    // duration: '30vh',
    end: '.first-trigger',
    properties: [
      {
        startValue: -20,
        endValue: -20,
        unit: 'vh',
        property: 'translateY',
      },
      {
        startValue: -20,
        endValue: -20,
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
        startValue: -20,
        endValue: -65,
        unit: 'vh',
        property: 'translateY',
      },
      {
        startValue: -20,
        endValue: -20,
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
        startValue: -65,
        endValue: -20,
        unit: 'vh',
        property: 'translateY',
      },
      {
        startValue: -20,
        endValue: -20,
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

export default class TopSectionText extends React.Component {
  render() {
    return (
      <Plx
        className='StickyText'
        parallaxData={ parallaxData }
      >
        <div className="container top-section-text">
          <div className="top-text">On-Demand Learning, Individualised Analysis, Real Result.</div>
          <div className="joining-text">Get started by joining today.</div>
          <div className="btn-group">
            <button>Students</button>
            <button>Parents</button>
            <button>Teachers</button>
            <button>Tutors</button>
          </div>
        </div>
      </Plx>
    );
  }
}