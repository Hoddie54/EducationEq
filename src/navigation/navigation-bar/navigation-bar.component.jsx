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
                        className="sidebar__item"
                        // onClick={() => {
                        //   this.toggleMenu(!this.state.isToggleMenu)
                        // }}
                        onClick={() => {
                          history.push("/specification/")
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
})

export default connect(mapStateToProps)(NavigationBar)
