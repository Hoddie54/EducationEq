import "./basepage.styles.scss"
import NavigationBar from "../../navigation/navigation-bar/navigation-bar.component"
import { useState } from "react"
import logo from "../../assets/logo.svg"
import { isNull } from "lodash"

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

  const [paymentModalDisplayed, setPaymentModalDisplayed] = useState(false)
  const [paymentModalContent, setPaymentModalContent] = useState()

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

  function setPaymentModalContentCallback(content) {
    if (isNull(content)) {
      setPaymentModalDisplayed(false)
      setPaymentModalContent(null)
      return
    }
    setPaymentModalDisplayed(true)
    setPaymentModalContent(content)
  }

  return (
    <>
      {props.blurred || paymentModalDisplayed ? (
        <div className="basepage__modal-container">
          {props.blurred && (
            <div className="basepage__modal">{props.modal_content} </div>
          )}
          {paymentModalContent && (
            <div className="basepage__modal">{paymentModalContent} </div>
          )}
        </div>
      ) : (
        ""
      )}
      <div
        className={`page ${
          props.blurred || paymentModalDisplayed ? "blurred" : ""
        }`}
      >
        <NavigationBar
          menu_col={props.menu_col}
          setPaymentModalContent={setPaymentModalContentCallback}
        ></NavigationBar>

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
