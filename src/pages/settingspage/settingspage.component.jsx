import React, { Component } from "react"
import NavigationBar from "../../navigation/navigation-bar/navigation-bar.component"
import SettingProfile from "../../components/setting-profile/setting-profile.component"
// import SettingAccount from "../../components/setting-account/setting-account.component"
// import SettingLorem from "../../components/setting-lorem/setting-lorem.component"
// import { Button } from "react-bootstrap"
import { withRouter } from "react-router"
import { logoutUser } from "./../../utils/firebase/auth"
import { connect } from "react-redux"
import "./settingspage.styles.scss"
import logo from "../../assets/logo.svg"
import { deleteAccount } from "../../utils/firebase/auth"
import ReactGA from "react-ga"
class SettingsPage extends Component {
  constructor(props) {
    super(props)
    // parse collapsed status from props
    const { currentUser } = this.props
    this.state = {
      isCollapsed: true,
      currentUser,
    }
    this.sidebar_click = this.sidebar_click.bind(this)
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

    let sidebar = document.getElementsByClassName("sidebar")[0]

    if (sidebar.classList.contains("active") && !this.state.isCollapsed) {
      sidebar.classList.remove("active")
    } else {
      sidebar.classList.add("active")
    }
  }

  handleLogout = () => {
    ReactGA.event({
      category: "User",
      action: "Log out",
      label: this.props.currentUser.id,
    })
    logoutUser()
    window.location.href = "/"
  }

  handleAccountDeletion = async () => {
    await deleteAccount()
    window.location.href = "/"
  }

  render() {
    return (
      <div className="page">
        <NavigationBar></NavigationBar>
        <div className="page__wrapper">
          <div className="page__center">
            <div className="header">
              {/* <button
                  className="header__burger"
                  onClick={this.sidebar_click}
                ></button> */}
              <img
                className="parallax-header_logo header__burger"
                src={logo}
                alt="header-logo"
                onClick={this.sidebar_click}
              ></img>
            </div>
            <div className="page__row page__bn1">
              <div className="banner">
                <div className="banner__container__title">
                  <span className="page-title">Settings</span>
                </div>
              </div>
            </div>
            <div className="page__row page__bn1">
              <div className="banner">
                {this.props.currentUser ? (
                  <div className="banner__container__body">
                    <SettingProfile
                      currentUser={this.props.currentUser}
                      handleLogout={this.handleLogout}
                      handleAccountDeletion={this.handleAccountDeletion}
                    ></SettingProfile>

                    {/* <SettingAccount></SettingAccount>
                    <div className="hr-line"></div> */}
                    {/* <SettingLorem></SettingLorem> */}
                  </div>
                ) : (
                  <React.Fragment />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
})

withRouter(SettingsPage)

export default connect(mapStateToProps)(SettingsPage)
