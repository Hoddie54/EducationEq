import "./basepage.styles.scss"
import NavigationBar from "../../navigation/navigation-bar/navigation-bar.component"
import { useState } from "react"
import logo from "../../assets/logo.svg"

function Basepage(props) {
  const [state, setState] = useState({
    isCollapsed: true,
    isLoading: false,
    isLoadingAnalytics: false,
    showAdditionalInfo: false,
    courses: [],
    createdCourses: [],
    public_courses: [],
  })

  function sidebar_click() {
    setState((state) => ({
      isCollapsed: !state.isCollapsed,
    }))
    let page = document.getElementsByClassName("page")[0]

    if (page.classList.contains("toggle") && !state.isCollapsed) {
      page.classList.remove("toggle")
    } else {
      page.classList.add("toggle")
    }

    let sidebar = document.getElementsByClassName("sidebar")[0]

    if (sidebar.classList.contains("active") && !state.isCollapsed) {
      sidebar.classList.remove("active")
    } else {
      sidebar.classList.add("active")
    }
    console.log("clicked")
  }

  return (
    <>
      <NavigationBar menu_col={props.menu_col}></NavigationBar>
      <div className="page">
        <div className={props.menu_col ? "page__wrapper_1" : "page__wrapper"}>
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
                onClick={sidebar_click}
              ></img>
            </div>

            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Basepage
