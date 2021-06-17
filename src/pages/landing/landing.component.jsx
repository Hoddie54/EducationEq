// import "core-js/es/map";
// import "core-js/es/set";

import React from "react";
import animateScroll from "animated-scroll-to";
// import Plx from "react-plx";

// import Explosion from "./parallax-sections/explosion";
// import Phone from "./parallax-sections/phone";
// import Links from "./parallax-sections/links";
// import StickyText from "./parallax-sections/sticky-text";

import Preview1 from "./parallax-sections/parallax-components/preview1";
import Preview2 from "./parallax-sections/parallax-components/preview2";
import Preview3 from "./parallax-sections/parallax-components/preview3";
import Preview4 from "./parallax-sections/parallax-components/preview4";
import TopSectionText from "./parallax-sections/parallax-components/top-section-text";

import NormalTopSection from "./parallax-sections/normal-components/normal-top-section";
import ListPartner from "./parallax-sections/normal-components/partners";
import LearningProcess from "./parallax-sections/normal-components/learning-process";
import InfinityScroll from "./parallax-sections/normal-components/infinity-scroll";
import HelpSchool from "./parallax-sections/normal-components/help-school";
import CTACard from "./parallax-sections/normal-components/cta-card";
import PriceNContact from "./parallax-sections/normal-components/price-n-contact";

// import LandingPageHeader from "./header";
import LandingPageHeader from "./header/normal.header";
import LandingPageFooter from "./footer";

import "./landing.component.scss";
import "./styles.scss";

export default class ParallaxLanding extends React.Component {
  handleScrollTop() {
    animateScroll(0, { minDuration: 3000 });
  }

  render() {
    let width = window.innerWidth;
    // let isMobile = (width < 768)

    // force to use normal version
    let isMobile = true 
    return (
      <div className="container-fluid landing-parallax-wrapper">
        <LandingPageHeader />
        <span className="first-trigger"></span>
        {!isMobile?(
          <>
          {/* <Preview1 />
          <Preview2 />
          <Preview3 />
          <Preview4 />
          <TopSectionText />

          <div style={{ height: "100vh" }}></div>
          <span className="preview1-trigger-end"></span>
          <div style={{ height: "100vh" }}></div>
          <span className="preview2-trigger"></span>
          <div style={{ height: "100vh" }}></div>
          <span className="preview2-trigger-end"></span>
          <div style={{ height: "100vh" }}></div>
          <span className="preview3-trigger"></span>
          <div style={{ height: "100vh" }}></div>
          <span className="preview3-trigger-end"></span>
          <div style={{ height: "100vh" }}></div>
          <span className="before-preview4-trigger"></span>
          <span className="preview4-trigger"></span>
          <div style={{ height: "100vh" }}></div>
          <span className="preview4-trigger-end"></span>
          <div className="breaking-session" style={{marginTop: -400, height: 300}}></div> */}
          </>
        ):(
          <>
            {/* <span className="preview4-trigger"></span> */}
            <NormalTopSection />
            {/* <span className="preview4-trigger-end"></span> */}
            <div className="breaking-session no-bg"></div>
            
          </>
        )}
        
        <ListPartner />
        <div className="breaking-session"></div>
        <LearningProcess />
        <div className="breaking-session"></div>
        <InfinityScroll />
        <div className="breaking-session"></div>
        <HelpSchool />
        <div className="breaking-session"></div>
        <CTACard />
        <div className="breaking-session"></div>
        <PriceNContact />

        <LandingPageFooter />
        {/* <button onClick={ () => this.handleScrollTop() }>Back to top</button> */}
      </div>
    );
  }
}
