import React from "react";

import LearnIcon from "./pics/ic_Video.svg";
import ActivityIcon from "./pics/ic_CheckList.svg";
import UpIcon from "./pics/ic_Up.svg";
import TargetIcon from "./pics/ic_Goal.svg";
import Group1090 from "./pics/Group_1090.svg";
import Group1091 from "./pics/Group_1091.svg";
import Group1092 from "./pics/Group_1092.svg";
import Group1093 from "./pics/Group_1093.svg";
import { Row, Col } from "react-bootstrap";
import "./help-school.styles.scss";

export default class HelpSchool extends React.Component {
  render() {
    return (
      <div className="section-wrapper container-fluid help-school-section" id="schools">
        <div className="container title-section">
          <div className="sub-title">Schools</div>
          <div className="title">Helping Schools through COVID-19</div>
        </div>
        <div className="container">
          <div className="list-card-item">
            <div className="card">
                <div className="pic">
                  <img
                    className=""
                    src={Group1090}
                    alt="process-learn-icon"
                  ></img>
                </div>
                <div className="card-border-left">
                  <div className="icon">
                    <img
                      className=""
                      src={LearnIcon}
                      alt="process-learn-icon"
                    ></img>
                  </div>
                  <div className="title">Teach Through Lockdown</div>
                  <div className="text">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed.
                  </div>
                </div>
                

            </div>
            <div className="card">

                <div className="pic">
                  <img
                    className=""
                    src={Group1091}
                    alt="process-learn-icon"
                  ></img>
                </div>
                <div className="card-border-left">
                  <div className="icon">
                    <img
                      className=""
                      src={ActivityIcon}
                      alt="process-learn-icon"
                    ></img>
                  </div>
                  <div className="title">Save Time</div>
                  <div className="text">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed.
                  </div>
                </div>

            </div>
            <div className="card">
                <div className="pic">
                  <img
                    className=""
                    src={Group1092}
                    alt="process-learn-icon"
                  ></img>
                </div>
                <div className="card-border-left">
                  <div className="icon">
                    <img
                      className=""
                      src={UpIcon}
                      alt="process-learn-icon"
                    ></img>
                  </div>
                  <div className="title">Improves Student Outcome</div>
                  <div className="text">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed.
                  </div>
                </div>
            </div>
            <div className="card">
                <div className="pic">
                  <img
                    className=""
                    src={Group1093}
                    alt="process-learn-icon"
                  ></img>
                </div>
                <div className="card-border-left">
                  <div className="icon">
                    <img
                      className=""
                      src={TargetIcon}
                      alt="process-learn-icon"
                    ></img>
                  </div>
                  <div className="title">Learn asdmasdk mas</div>
                  <div className="text">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs. The
                    passage is attributed.
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
