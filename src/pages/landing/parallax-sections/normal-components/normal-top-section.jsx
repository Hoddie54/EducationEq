import React from 'react';

import preview from '../parallax-components/pics/Group-1051.svg'
import "./normal-top-section.styles.scss";


export default class TopSection extends React.Component {
  render() {
    return (
      <div className="container-fluid top-section-text normal-top-section">
        <div className="content-wrapper">
        <div className="container">
          <div className="left-panel">
            <div className="top-text">On-Demand Learning, Individualised Analysis, Real Result.</div>
            <div className="title-joining-us">Get started by joining today.</div>
            <div className="joining-us-btn-group">
              <div className="group">
              <button>Students</button>
              <button>Parents</button>
              <button>Teachers</button>
              <button>Tutors</button>
              </div>
            </div>
            <div className="vertical-line-block">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <div className="right-panel">
            <img
              className="parallax-header_logo logo1"
              src={preview}
              alt="header-logo"
            ></img>
          </div>
        </div>
        </div>
      </div>
    );
  }
}