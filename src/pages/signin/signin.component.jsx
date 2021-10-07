import React from "react"
import "./signin.component.scss"
import SignIn from "../../components/sign-in/sign-in.component"
import { loginUser, signInWithGoogle } from "./../../utils/firebase/auth"
import {
  fetchUser,
  saveUserToFirestore,
} from "./../../utils/firebase/firestore"
import ReactGA from "react-ga"
import SignUp from "../../pages/signup/signup.component"
import { iOS } from "../../utils/helpers/misc"
import { setCurrentUser } from "../../utils/redux/user/user.action"
import { connect } from "react-redux"

class Signin extends React.Component {
  constructor(props) {
    super(props)
    // parse collapsed status from props
    this.state = {
      isUpdateHeaderColor: "rgba(0,0,0,0)",
      signin: true,
    }
    this.switchToSignUp = this.switchToSignUp.bind(this)
  }

  signIn = (data, changeErrorMessage) => {
    // this.setState({
    //   isSignIn: false,
    // })

    loginUser(data.email, data.password, changeErrorMessage)
      // .then(async (response) => {
      //   console.log(response.user.uid)
      //   const user = await fetchUser(response.user.uid)
      //   console.log(iOS())
      //   console.log("HELLO")
      //   console.log(user)
      //   this.props.setCurrentUser(user)
      // })
      .then(this.registerEvent)
  }

  signUpWithGoogle = (user_type) => {
    signInWithGoogle().then((res) => {
      const full_name = res.additionalUserInfo.profile.name
      const userObject = {
        full_name,
        display_name: full_name,
        uid: res.user.uid,
        user_type: "student",
        email: res.user.email,
        creation_date: Date.now(),
      }
      saveUserToFirestore(userObject).catch((err) => {
        console.log("error saving google auth user:", err)
      })
    })
    // .then(() => {
    //   if (iOS()) {
    //     this.props.iOSResetTrigger()
    //   }
    // })
  }

  registerEvent() {
    ReactGA.event({ category: "User", action: "Account login" })
  }

  switchToSignUp() {
    this.setState((state) => {
      return { ...state, signin: false }
    })
  }

  render() {
    if (this.state.signin)
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
            switchToSignUp={this.switchToSignUp}
          ></SignIn>
        </div>
      )
    return <SignUp></SignUp>
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

const mapStateToProps = ({ user }) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
