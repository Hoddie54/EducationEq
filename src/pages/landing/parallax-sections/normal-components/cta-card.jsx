import React from 'react';
import "./cta-card.styles.scss";

export default class CTACard extends React.Component {
  render() {
    return (
      <div className="section-wrapper container-fluid cta-card-section">
        <div className="container">
          <div className="card">
            <div className="title">Learn asdmasdk mas</div>
            <div className="text">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed.</div>
            <div className="btn-group btn-cta-card">
              <button className="btn-schedule">Schedule a call &gt; </button>
              <button>Sign Up &gt; </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}