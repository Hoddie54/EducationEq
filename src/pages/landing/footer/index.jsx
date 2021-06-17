import React from 'react';

import logo from "../header/logo.svg";

import './styles.scss';

export default class ParallaxFooter extends React.Component {

  render() {
    return (
      <div className='container-fluid landing-page-footer__wrapper'>
        <div className="end-of-content-card"></div>
        <div className="container">
          <div className="vertical-menu">
            <div className="item">
              <img
                className="logo-white"
                src={logo}
                alt="header-logo"
              ></img>
            </div>
            <div className="item">Contact us</div>
            <div className="item">Login</div>
            <div className="item">Sign up</div>
            <div className="item">Privacy Policy</div>
          </div>
          <div className="copyright-line">
            <div className="left-panel">© 2020 Education Equation</div>
            <div className="right-panel">P2 (Trading as Education Equation) is a registered business in England - (08482934), VAT no 209503623.</div>
          </div>
        </div>
      </div>
    );
  }
};