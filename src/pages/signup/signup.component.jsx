import React from "react"

import "./signup.component.scss"
import SignIn from "../../components/sign-in/sign-in.component"
import SignUp from "../../components/sign-up/sign-up.component"
import AdditionInformationForm from "../../components/addition-infomation-form"
import {
  loginUser,
  registerUser,
  resetPassword,
  signInWithGoogle,
} from "./../../utils/firebase/auth"
import { saveUserToFirestore } from "./../../utils/firebase/firestore"
import ReactGA from "react-ga"

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    // parse collapsed status from props
    this.state = {
      isCollapsed: true,
      isSignIn: false,
      isSignUp: true,
      isUpdateHeaderColor: "rgba(0,0,0,0)",
      showAdditionalInfo: false,
      signUpData: {},
    }
  }

  showSignIn = () => {
    this.setState({
      isSignIn: true,
      isSignUp: false,
    })
  }
  signIn = (data, changeErrorMessage) => {
    // this.setState({
    //   isSignIn: false,
    // })
    loginUser(data.email, data.password, changeErrorMessage).then(() => {
      ReactGA.event({ category: "User", action: "Account login" })
    })
  }

  showSignUp = () => {
    this.setState({
      isSignUp: true,
      isSignIn: false,
    })
  }
  signUp = (data) => {
    this.setState({
      isSignUp: false,
      signUpData: data,
    })

    this.setState({ showAdditionalInfo: true })
  }

  completeSignUp = (data) => {
    this.setState(
      {
        signUpData: {
          ...data,
          ...this.state.signUpData,
        },
      },
      () => {
        registerUser(this.state.signUpData).then(this.registerEvent)
      }
    )
  }

  signUpWithGoogle = (user_type) => {
    this.setState({
      isSignUp: false,
    })
    signInWithGoogle().then((res) => {
      console.log("google auth 1:", res.user.uid, res.user.email)
      console.log("google auth profile:", res.additionalUserInfo.profile)
      const full_name = res.additionalUserInfo.profile.name
      const userObject = {
        full_name,
        display_name: full_name,
        uid: res.user.uid,
        user_type: user_type,
        email: res.user.email,
        creation_date: Date.now(),
      }
      saveUserToFirestore(userObject)
        .then(this.registerEvent)
        .catch((err) => {
          console.log("error saving google auth user:", err)
        })
    })
  }

  hideModal = () => {
    this.setState({
      isSignUp: false,
      isSignIn: false,
    })
  }

  registerEvent = () => {
    ReactGA.event({ category: "User", action: "Account creation" })
  }

  // #002DC3
  render() {
    return (
      <div
        className="landing-page-header__wrapper"
        style={{ background: this.state.isUpdateHeaderColor }}
      >
        <SignIn
          show={this.state.isSignIn}
          handleHide={this.hideModal}
          handleSignIn={this.signIn}
          signInWithGoogle={this.signUpWithGoogle}
          switchToSignUp={this.switchToSignUp}
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
            console.log("handleHide")
          }}
          handleAction={() => {
            console.log("handleAction")
          }}
        />
      </div>
    )
  }
}
