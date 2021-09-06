import React from "react"
// import ReactDOM from "react-dom";
import { Nav, Image, Spinner, Collapse } from "react-bootstrap"
import { IconSVG } from "../../components/icon-svg"
import "./navigation-bar.styles.scss"
import logo from "../../assets/logo.svg"
import profilepic from "../../assets/default-avatar.png"
import { connect } from "react-redux"
import { capitalize } from "lodash"
import history from "../../history"
import SpinnerPage from "../../pages/spinner/spinner.component"
import StripeTest from "../../pages/stripe-test/stripe-test.component"
// import {
//   fetchCreatedCourses,
//   fetchAvailableCourses,
// } from "./../../utils/firebase/firestore"

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    // parse collapsed status from props
    this.state = {
      isCollapsed: true,
      isToggleMenu: false,
      isTeachingExpanded: false,
    }
    this.sidebar_click = this.sidebar_click.bind(this)
    // this.handleFetchCourses()
    // this.fetchCreatedCourses()
  }

  componentDidMount() {
    // let currentLocation = window.location.pathname
    // if (currentLocation == "/courses") {
    //   this.setState({
    //     isToggleMenu: true,
    //   })
    // }
    // if (currentLocation == "/teaching") {
    //   this.setState({
    //     isTeachingExpanded: true,
    //   })
    // }
  }

  sidebar_click() {
    this.setState((state) => ({
      isCollapsed: !state.isCollapsed,
    }))
    let page = document.getElementsByClassName("page")[0]

    if (page.classList.contains("toggle") && !this.state.isCollapsed) {
      page.classList.remove("toggle")
    } else {
      page.classList.add("toggle")
    }
  }

  toggleMenu = (value) => {
    this.setState({ isToggleMenu: value })
  }

  toggleTeachingExpanded = (value) => {
    this.setState({ isTeachingExpanded: value })
  }

  // handleFetchCourses = () => {
  //   const { currentUser } = this.props
  //   if (!currentUser) return
  //   fetchAvailableCourses(currentUser.uid)
  //     .then((courses) => {
  //       this.setState({ courses })
  //     })
  //     .catch((err) => {
  //       alert(err.message)
  //     })
  // }

  // fetchCreatedCourses = () => {
  //   const { currentUser } = this.props
  //   if (!currentUser) return
  //   fetchCreatedCourses(currentUser.uid)
  //     .then((createdCourses) => {
  //       console.log("created courses:", createdCourses)
  //       this.setState({ createdCourses })
  //     })
  //     .catch((err) => {
  //       alert(err.message)
  //     })
  // }

  onClick = () => {}

  render() {
    var currentLocation = window.location.pathname
    const { currentUser } = this.props

    const wallet = (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24 3.6V20.6182C24 22.4832 22.4984 24 20.64 24H3.36C1.50161 24 0 22.4832 0 20.6182V3.6C0 1.61177 1.61177 0 3.6 0H20.4C22.3882 0 24 1.61177 24 3.6ZM21.6 18.9952C21.2247 19.1278 20.8208 19.2 20.4 19.2H3.6C3.17924 19.2 2.77533 19.1278 2.4 18.9952V20.6182C2.4 21.1631 2.83252 21.6 3.36 21.6H20.64C21.1675 21.6 21.6 21.1631 21.6 20.6182V18.9952ZM21.6 15.6V3.6C21.6 2.93726 21.0627 2.4 20.4 2.4H3.6C2.93726 2.4 2.4 2.93726 2.4 3.6V15.6C2.4 16.2627 2.93726 16.8 3.6 16.8H20.4C21.0627 16.8 21.6 16.2627 21.6 15.6ZM13.2 4.8H14.3437C15.0065 4.8 15.5437 5.33726 15.5437 6V6.5451C15.5437 7.20784 15.0065 7.7451 14.3437 7.7451C13.9226 7.7451 13.5522 7.52819 13.338 7.2H10.8167V8.40109H13.2C14.5255 8.40109 15.6 9.47561 15.6 10.8011V12C15.6 13.3255 14.5255 14.4 13.2 14.4C13.1943 15.0579 12.6592 15.5895 12 15.5895C11.3408 15.5895 10.8057 15.0579 10.8 14.4H9.60001C8.92536 14.4 8.3833 13.844 8.40039 13.1696L8.41712 12.5095C8.43391 11.847 8.98461 11.3235 9.64714 11.3403C10.1047 11.3519 10.4959 11.6182 10.6887 12H13.2V10.8011H10.8167C9.49125 10.8011 8.41674 9.72657 8.41674 8.40109V7.2C8.41674 5.8801 9.48223 4.80905 10.8 4.80006C10.8 4.13726 11.3373 3.6 12 3.6C12.6627 3.6 13.2 4.13726 13.2 4.8Z"
          fill="url(#paint0_radial)"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(12 12) rotate(90) scale(12)"
          >
            <stop stop-color="#369AFF" />
            <stop offset="1" stop-color="#0340FF" />
          </radialGradient>
        </defs>
      </svg>
    )

    return (
      <div className={this.props.menu_col ? "big__wrapper" : ""}>
        {currentUser ? (
          <div className={`sidebar${!this.state.isCollapsed ? " active" : ""}`}>
            <div className="sidebar__top">
              <div className="sidebar__top_logowrapper">
                <Nav.Link className="sidebar__logo" href="/home">
                  <Image
                    className="sidebar__pic sidebar__pic_black"
                    src={logo}
                    alt=""
                  ></Image>
                </Nav.Link>
              </div>
              <div className="sidebar__top_userwrapper">
                <div className="sidebar__top_profile profile-pic standard-padding">
                  <Image
                    className="sidebar__pic sidebar__pic_black"
                    src={profilepic}
                    alt=""
                  ></Image>
                </div>
                <div className="sidebar__top_profile profile-greeting standard-padding">
                  Hello,&nbsp;
                  <span className="profile-greeting__username">
                    {currentUser.display_name}
                  </span>
                </div>
                <div className="sidebar__top_profile profile-title standard-padding">
                  {capitalize(currentUser.user_type)}
                </div>
              </div>
              {/* <button
                className="sidebar__burger"
                onClick={this.sidebar_click}
              ></button> */}
              <img
                className="parallax-header_logo sidebar__burger"
                src={logo}
                alt="header-logo"
                onClick={this.sidebar_click}
              ></img>
              <div className="sidebar__top_profile profile-title standard-padding wallet">
                <div>{wallet}</div>
                <div>£{(this.props.balance / 100).toFixed(2)}</div>
              </div>
              <div className="sidebar__top_profile profile-title standard-padding">
                <div
                  className="top-up-button"
                  onClick={() =>
                    this.props.setPaymentModalContent(
                      <StripeTest
                        cancel={() => {
                          this.props.setPaymentModalContent(null)
                        }}
                        currentUser={currentUser}
                      />
                    )
                  }
                >
                  Top-up funds
                </div>
              </div>
            </div>
            <div className="hr-86 hide-tab"></div>
            <div
              className={`profile-pic standard-padding profile-pic-second${
                !this.state.isCollapsed ? " hide-tab-collapsed" : ""
              }`}
            >
              <Image
                className="sidebar__pic sidebar__pic_black"
                src={profilepic}
                alt=""
              ></Image>
            </div>
            <div className="sidebar__wrapper">
              <div className="sidebar__inner">
                <div className="sidebar__list">
                  <div className="sidebar__group">
                    <div className="sidebar__menu">
                      <Nav.Link
                        className={
                          (currentLocation == "/home") |
                          (currentLocation === "/")
                            ? "sidebar__item active"
                            : "sidebar__item"
                        }
                        href="/"
                      >
                        <div className="sidebar__icon">
                          <IconSVG name="home"></IconSVG>
                        </div>
                        <div className="sidebar__text">Home</div>
                      </Nav.Link>
                      {/* <Nav.Link
                        className={
                          currentLocation == "/"
                            ? "sidebar__item active"
                            : "sidebar__item"
                        }
                        href="/"
                      >
                        <div className="sidebar__icon">
                          <IconSVG name="analytics"></IconSVG>
                        </div>
                        <div className="sidebar__text">Analytics</div>
                      </Nav.Link> */}
                      <Nav.Link
                        className={
                          currentLocation == "/specification"
                            ? "sidebar__item active"
                            : "sidebar__item"
                        }
                        // onClick={() => {
                        //   this.toggleMenu(!this.state.isToggleMenu)
                        // }}
                        onClick={() => {
                          history.push("/specification")
                        }}
                        aria-controls="collapse-module"
                        aria-expanded={this.state.isToggleMenu}
                        // href="/specification"
                      >
                        <div className="sidebar__icon">
                          <IconSVG name="video"></IconSVG>
                        </div>
                        <div className="sidebar__text">My progress</div>
                      </Nav.Link>
                      <Nav.Link
                        className={
                          currentLocation == "/tutoring"
                            ? "sidebar__item active"
                            : "sidebar__item"
                        }
                        // onClick={() => {
                        //   this.toggleMenu(!this.state.isToggleMenu)
                        // }}
                        onClick={() => {
                          history.push("/tutoring")
                        }}
                        aria-controls="collapse-module"
                        aria-expanded={this.state.isToggleMenu}
                        // href="/specification"
                      >
                        <div className="sidebar__icon">
                          <IconSVG name="student"></IconSVG>
                        </div>
                        <div className="sidebar__text">Tutoring</div>
                      </Nav.Link>

                      {/* <Collapse in={this.state.isToggleMenu}>
                        <div id="collapse-module">
                          {this.state.courses.map((course, index) => {
                            return (
                              <Nav.Link
                                key={index}
                                className={
                                  currentLocation == "/courses"
                                    ? "sidebar__item sub__item active"
                                    : "sidebar__item sub__item"
                                }
                                onClick={() => {
                                  history.push("/courses/" + course.id)
                                }}
                              >
                                <div className="sidebar__text">
                                  - {course.title}
                                </div>
                              </Nav.Link>
                            )
                          })}
                        </div>
                      </Collapse> */}
                      {/* {currentUser.user_type == "teacher" &&
                      this.state.createdCourses ? (
                        <React.Fragment>
                          <Nav.Link
                            className={
                              currentLocation == "/teaching"
                                ? "sidebar__item active"
                                : "sidebar__item"
                            }
                            onClick={() => {
                              this.toggleTeachingExpanded(
                                !this.state.isTeachingExpanded
                              )
                            }}
                            aria-controls="collapse-module"
                            aria-expanded={this.state.isTeachingExpanded}
                          >
                            <div className="sidebar__icon">
                              <IconSVG name="student"></IconSVG>
                            </div>
                            <div className="sidebar__text">Teaching</div>
                          </Nav.Link>
                          <Collapse in={this.state.isTeachingExpanded}>
                            <div id="ollapse-module">
                              {this.state.createdCourses.map(
                                (course, index) => {
                                  return (
                                    <Nav.Link
                                      key={index}
                                      className={
                                        currentLocation == "/courses"
                                          ? "sidebar__item sub__item active"
                                          : "sidebar__item sub__item"
                                      }
                                      onClick={() => {
                                        history.push(`/teaching/${course.id}`)
                                      }}
                                    >
                                      <div className="sidebar__text">
                                        - {course.title}
                                      </div>
                                    </Nav.Link>
                                  )
                                }
                              )}
                            </div>
                          </Collapse>
                        </React.Fragment>
                      ) : (
                        <React.Fragment />
                      )} */}

                      {/* <Nav.Link
                        className={
                          currentLocation == "/terms-condition"
                            ? "sidebar__item active"
                            : "sidebar__item"
                        }
                        href="/terms-condition"
                      >
                        <div className="sidebar__icon">
                          <IconSVG name="message"></IconSVG>
                        </div>
                        <div className="sidebar__text">Messages</div>
                      </Nav.Link> */}
                      {/* <Nav.Link
                        className={
                          currentLocation == "/past-papers"
                            ? "sidebar__item active"
                            : "sidebar__item"
                        }
                        href="/past-papers"
                      >
                        <div className="sidebar__icon">
                          <IconSVG name="student"></IconSVG>
                        </div>
                        <div className="sidebar__text">Past papers</div>
                      </Nav.Link> */}
                      <Nav.Link
                        className={
                          currentLocation == "/settings"
                            ? "sidebar__item active"
                            : "sidebar__item"
                        }
                        href="/settings"
                      >
                        <div className="sidebar__icon">
                          <IconSVG name="setting"></IconSVG>
                        </div>
                        <div className="sidebar__text">Settings</div>
                      </Nav.Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SpinnerPage />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  balance: state.user.balance,
})

export default connect(mapStateToProps)(NavigationBar)
