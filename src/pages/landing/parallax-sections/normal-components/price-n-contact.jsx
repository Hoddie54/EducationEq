import React from 'react';

import FreeIcon from './pics/ic_Free.svg'
import HatIcon from './pics/ic_Hat.svg'
import UserIcon from './pics/ic_User.svg'
import PhoneIcon from './pics/ic_Phone.svg'
import "./price-n-contact.styles.scss";

export default class PriceAndContact extends React.Component {
  render() {
    return (
      <div className="section-wrapper container-fluid price-n-contact-section">
        <div className="container price-section">
          <div className="price-title">
            <div className="sub-title">Pricing</div>
            <div className="title">Ready to get started</div>
          </div>
          <div className="list-card">
            <div className="card">
              <div className="pic">
                <img
                  className=""
                  src={FreeIcon}
                  alt="process-learn-icon"
                ></img>
              </div>
              <div className="title">Full Platform Access</div>
              <div className="sub-title">Free For Everyone</div>
              <div className="text">
                {/* <ul>
                  <li>Top selling point</li>
                  <li>Top selling point</li>
                  <li>Top selling point</li>
                  <li>Top selling point</li>
                </ul> */}
                Get full access to our platform, including: on-demand content, individualised analytics and school courses.
              </div>
            </div>
            <div className="card">
              <div className="pic">
                <img
                  className=""
                  src={FreeIcon}
                  alt="process-learn-icon"
                ></img>
              </div>
              <div className="title">1-1 Tutoring</div>
              <div className="sub-title">£18-35 / hour</div>
              <div className="text">Bespoke, handpicked tutors ready to help address student weaknesses identified through EdEq analytics.</div>
            </div>
            <div className="card none-card-style">
              <div className="pic">
                <img
                  className=""
                  src={UserIcon}
                  alt="process-learn-icon"
                ></img>
              </div>
              <div className="title">Sign Up Today</div>
              {/* <div className="sub-title">Learn asdmasdk mas</div> */}
              <div className="text">Access 250+ hours of content, in-depth analytics, be spoke tutoring today.</div>
            </div>
          </div>
          <div className="btn-group">
            <div className="title-joining-us">Get started by joining today</div>
            <div className="group">
              <button>Students</button>
              <button>Students</button>
              <button>Students</button>
              <button>Students</button>
            </div>
          </div>
        </div>
        <div className="container contact-section" id="contact_us">
          <div className="contact-title">
            <div className="sub-title">Contact us</div>
            <div className="title">Get in touch</div>
          </div>
          <div className="contact-form">
            <div className="left-form">
              <div className="desc">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed.</div>
              <input type="text" placeholder="Name"></input>
              <input type="email" placeholder="Email"></input>
              <textarea col="6" placeholder="Message"></textarea>
            </div>
            <div className="right-form">
              <div className="right-content-wrapper">
                <div className="icon">
                  <img
                    className=""
                    src={PhoneIcon}
                    alt="process-learn-icon"
                  ></img>
                </div>
                <div className="title">Contact us</div>
                <div className="email">info@asdjahsdhasjd</div>
                <div className="phone">+44 a12381283128132813</div>
                <div className="address">Lorem ipsum, or lipsum as it is sometimes known,</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}