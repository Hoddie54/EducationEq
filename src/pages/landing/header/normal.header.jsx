import React from "react";

import logo from "./logo.svg";

import "./styles.scss";
import SignIn from "../../../components/sign-in/sign-in.component";
import SignUp from "../../../components/sign-up/sign-up.component";
import AdditionInformationForm from "../../../components/addition-infomation-form";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
} from "./../../../utils/firebase/auth";
import { saveUserToFirestore } from "./../../../utils/firebase/firestore";
import { Link } from "react-scroll";

export default class LandingPageNormalHeader extends React.Component {
  constructor(props) {
    super(props);
    // parse collapsed status from props
    this.state = {
      isCollapsed: true,
      isSignIn: false,
      isSignUp: false,
      isUpdateHeaderColor: "rgba(0,0,0,0)",
      showAdditionalInfo: false,
      signUpData: {},
    };
    this.sidebar_click = this.sidebar_click.bind(this);
  }

  listenScrollEvent = (e) => {
    if (window.scrollY > 400) {
      this.setState({ isUpdateHeaderColor: "#002DC3" });
    } else {
      this.setState({ isUpdateHeaderColor: "rgba(0,0,0,0)" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
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
  signIn = (data) => {
    this.setState({
      isSignIn: false,
    });
    loginUser(data.email, data.password);
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

      signUpData: data,
    });

    this.setState({ showAdditionalInfo: true });
  };

  completeSignUp = (data) => {
    this.setState(
      {
        signUpData: {
          ...data,
          ...this.state.signUpData,
        },
      },
      () => {
        registerUser(this.state.signUpData);
      }
    );
  };

  signUpWithGoogle = (user_type) => {
    this.setState({
      isSignUp: false,
    });
    signInWithGoogle().then((res) => {
      console.log("google auth 1:", res.user.uid, res.user.email);
      console.log("google auth profile:", res.additionalUserInfo.profile);
      const full_name = res.additionalUserInfo.profile.name;
      const userObject = {
        full_name,
        display_name: full_name,
        uid: res.user.uid,
        user_type: user_type,
        email: res.user.email,
        creation_date: Date.now(),
      };
      saveUserToFirestore(userObject).catch((err) => {
        console.log("error saving google auth user:", err);
      });
      // this.setState(
      //   {
      //     signUpData: {
      //       ...data,
      //       ...this.state.signUpData,
      //     },
      //   },
      //   () => {
      //     console.log("FINAL DATA:", this.state.signUpData);
      //     registerUser(this.state.signUpData);
      //   }
      // );
    });
  };

  hideModal = () => {
    this.setState({
      isSignUp: false,
      isSignIn: false,
    });
  };

  // #002DC3
  render() {
    return (
      <div
        className="landing-page-header__wrapper"
        style={{ background: this.state.isUpdateHeaderColor }}
      >
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
        <AdditionInformationForm
          type={this.state.signUpData.user_type}
          show={this.state.showAdditionalInfo}
          handleCompleteSignUp={this.completeSignUp}
          handleHide={() => {
            console.log("handleHide");
          }}
          handleAction={() => {
            console.log("handleAction");
          }}
        />
      </div>
    );
  }
}
