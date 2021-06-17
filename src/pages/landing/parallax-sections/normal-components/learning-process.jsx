import React from 'react';

import LearnIcon from './pics/ic_Video.svg'
import TestIcon from './pics/ic_CheckList.svg'
import TutorIcon from './pics/ic_Hat.svg'
import "./learning-process.styles.scss";

export default class LearningProcess extends React.Component {
  render() {
    return (
        <div className="section-wrapper container-fluid learning-process-section">
        <div className="container">
          <div className="row">
            <div className="sub-title">Learning Process</div>
            <div className="title">How does our platform work</div>
          </div>
          <div className="row list-learning-process">
            <div className="learning-process_item">
              <div className="icon">
                <img
                  className=""
                  src={LearnIcon}
                  alt="process-learn-icon"
                ></img>
              </div>
              <div className="title">Learn</div>
              <div className="text">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed.</div>
            </div>
            <div className="learning-process_item">
            <div className="icon">
              <img
                className=""
                src={TestIcon}
                alt="process-test-icon"
              ></img>
            </div>
              <div className="title">Test & Analysis</div>
              <div className="text">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed.</div>
            </div>
            <div className="learning-process_item">
            <div className="icon">
              <img
                className=""
                src={TutorIcon}
                alt="process-tutor-icon"
              ></img>
            </div>
              <div className="title">Tutor</div>
              <div className="text">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}