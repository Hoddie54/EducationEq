import React from "react"
import "./signin.component.scss"
import SignIn from "../../components/sign-in/sign-in.component"
import { loginUser, signInWithGoogle } from "./../../utils/firebase/auth"
import { saveUserToFirestore } from "./../../utils/firebase/firestore"
import ReactGA from "react-ga"

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    // parse collapsed status from props
    this.state = {
      isUpdateHeaderColor: "rgba(0,0,0,0)",
    }
  }

  signIn = (data, changeErrorMessage) => {
    // this.setState({
    //   isSignIn: false,
    // })

    loginUser(data.email, data.password, changeErrorMessage).then(
      this.registerEvent
    )
  }

  signUpWithGoogle = (user_type) => {
    signInWithGoogle().then((res) => {
      const full_name = res.additionalUserInfo.profile.name
      const userObject = {
        full_name,
        display_name: full_name,
        uid: res.user.uid,
        user_type: user_type,
        email: res.user.email,
        creation_date: Date.now(),
      }
      saveUserToFirestore(userObject).catch((err) => {
        console.log("error saving google auth user:", err)
      })
    })
  }

  registerEvent() {
    ReactGA.event({ category: "User", action: "Account login" })
  }

  render() {
    return (
      <div
        className="landing-page-header__wrapper"
        style={{ background: this.state.isUpdateHeaderColor }}
      >
        <SignIn
          show={true}
          handleHide={this.hideModal}
          handleSignIn={this.signIn}
          signInWithGoogle={this.signUpWithGoogle}
        ></SignIn>
      </div>
    )
  }
}
