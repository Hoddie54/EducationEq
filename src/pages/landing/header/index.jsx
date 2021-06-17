import React from "react";
import Plx from "react-plx";

import logo from "./logo.svg";

import "./styles.scss";
import SignIn from "../../../components/sign-in/sign-in.component";
import SignUp from "../../../components/sign-up/sign-up.component";
import { Link } from "react-scroll";
import { registerUser, signInWithGoogle } from "./../../../utils/firebase/auth";

const parallaxData = [
  {
    start: ".first-trigger",
    startOffset: "60vh",
    // duration: '30vh',
    end: ".preview4-trigger",
    properties: [
      {
        startValue: "rgba(0,0,0,0)",
        endValue: "rgba(0,0,0,0)",
        property: "backgroundColor",
      },
    ],
  },
  {
    start: ".preview4-trigger",
    startOffset: "60vh",
    // duration: '30vh',
    end: ".first-trigger",
    properties: [
      {
        startValue: "rgba(0,0,0,0)",
        endValue: "rgba(0,0,0,0)",
        property: "backgroundColor",
      },
    ],
  },
  {
    start: ".preview4-trigger",
    startOffset: "60vh",
    // duration: '30vh',
    end: ".preview4-trigger-end",
    properties: [
      {
        startValue: "rgba(0,0,0,0)",
        endValue: "#002DC3",
        property: "backgroundColor",
      },
    ],
  },
  {
    start: ".preview4-trigger-end",
    startOffset: "60vh",
    // duration: '30vh',
    end: ".preview4-trigger",
    properties: [
      {
        startValue: "#002DC3",
        endValue: "rgba(0,0,0,0)",
        property: "backgroundColor",
      },
    ],
  },
];

export default class LandingPageHeader extends React.Component {
  constructor(props) {
    super(props);
    // parse collapsed status from props
    this.state = {
      isCollapsed: true,
      isSignIn: false,
      isSignUp: false,
    };
    this.sidebar_click = this.sidebar_click.bind(this);
  }

  sidebar_click() {
    this.setState((state) => ({
      isCollapsed: !state.isCollapsed,
    }));

    let sidebar = document.getElementsByClassName(
      "parallax-header_menu_wrapper"
    )[0];

    if (sidebar.classList.contains("active") && !this.state.isCollapsed) {
      sidebar.classList.remove("active");
    } else {
      sidebar.classList.add("active");
    }

    let sidebar2 = document.getElementsByClassName(
      "parallax-header_btn-group_wrapper"
    )[0];

    if (sidebar2.classList.contains("active") && !this.state.isCollapsed) {
      sidebar2.classList.remove("active");
    } else {
      sidebar2.classList.add("active");
    }
  }
  showSignIn = () => {
    this.setState({
      isSignIn: true,
      isSignUp: false,
    });
  };
  signIn = () => {
    this.setState({
      isSignIn: false,
    });
  };
  showSignUp = () => {
    this.setState({
      isSignUp: true,
      isSignIn: false,
    });
  };
  signUp = (data) => {
    this.setState({
      isSignUp: false,
    });
    registerUser(data);
  };

  signUpWithGoogle = () => {
    this.setState({
      isSignUp: false,
    });
    signInWithGoogle();
  };

  hideModal = () => {
    this.setState({
      isSignUp: false,
      isSignIn: false,
    });
  };

  render() {
    return (
      <Plx parallaxData={parallaxData} className="landing-page-header__wrapper">
        <div className="container">
          <div
            className="parallax-header_logo_wrapper"
            onClick={this.sidebar_click}
          >
            <img
              className="parallax-header_logo"
              src={logo}
              alt="header-logo"
            ></img>
          </div>
          <div className="parallax-header_menu_wrapper">
            <div className="menu">
              <div className="menu_item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to="schools"
                  spy={true}
                  smooth={true}
                  duration={1000}
                >
                  Schools
                </Link>
              </div>
              <div className="menu_item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to="testimonials"
                  spy={true}
                  smooth={true}
                  duration={1000}
                >
                  Testimonials
                </Link>
              </div>
              <div className="menu_item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to="contact_us"
                  spy={true}
                  smooth={true}
                  duration={1000}
                >
                  Contact us
                </Link>
              </div>
              <div
                className="menu_item btn-login-mobile"
                onClick={this.showSignIn}
              >
                Login
              </div>
              <div
                className="menu_item btn-sign-up-mobile"
                onClick={this.showSignUp}
              >
                Sign Up
              </div>
            </div>
          </div>
          <div className="parallax-header_btn-group_wrapper">
            <div className="btn btn-login" onClick={this.showSignIn}>
              Login
            </div>
            <div className="btn btn-signup" onClick={this.showSignUp}>
              Sign Up
            </div>
          </div>
        </div>
        <SignIn
          show={this.state.isSignIn}
          handleHide={this.hideModal}
          handleSignIn={this.signIn}
          signInWithGoogle={this.signUpWithGoogle}
        ></SignIn>
        <SignUp
          show={this.state.isSignUp}
          handleHide={this.hideModal}
          handleSignUp={this.signUp}
          showSignIn={this.showSignIn}
          signUpWithGoogle={this.signUpWithGoogle}
        ></SignUp>
      </Plx>
    );
  }
}
