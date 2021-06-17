import React from "react";

import preview1 from "./pics/partner1.png";
import preview2 from "./pics/partner2.png";
import preview3 from "./pics/partner3.png";
import "./partners.styles.scss";

export default class ListPartner extends React.Component {
  render() {
    return (
      <div className="section-wrapper container-fluid partner-section">
        <div className="container">
          <div className="list-partner">
            <div className="partner-image">
              <img className="partner" src={preview1} alt="header-logo"></img>
            </div>
            <div className="partner-image">
              <img className="partner" src={preview2} alt="header-logo"></img>
            </div>
            <div className="partner-image">
              <img className="partner" src={preview3} alt="header-logo"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
