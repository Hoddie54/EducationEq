import React, { Component } from "react"
import { Route, Router, Switch, Redirect } from "react-router-dom"
import loadable from "@loadable/component"
import { auth } from "./utils/firebase/auth"
import {
  createUserProfileDocument,
  enablePersistence,
} from "./utils/firebase/firestore"
import "./assets/font/font-style.scss"
import { connect } from "react-redux"
import { setCurrentUser } from "./utils/redux/user/user.action"
import history from "./history"
import SpecPage from "./pages/specpage/specpage.component"
import Specvideos from "./pages/specvideos/specvideos.component"

const HomePage = loadable(() => import("./pages/homepage3/homepage3.component"))
// const ParallaxLanding = loadable(() =>
//   import("./pages/landing/landing.component")
// )
const SignUp = loadable(() => import("./pages/signup/signup.component"))
const SignIn = loadable(() => import("./pages/signin/signin.component"))
// const CoursesPage = loadable(() =>
//   import("./pages/coursespage/coursespage.component")
// )
const SettingsPage = loadable(() =>
  import("./pages/settingspage/settingspage.component")
)
const TermsConditionPage = loadable(() =>
  import("./pages/termsconditionpage/termsconditionpage.component")
)
// const TeacherPage = loadable(() =>
//   import("./pages/teacherpage/teacherpage.component")
// )

const SubtopicPage = loadable(() =>
  import("./pages/subtopicpage/subtopicpage.component")
)

const VideoPage = loadable(() =>
  import("./pages/videopage/videopage.component")
)

const QuestionsPage = loadable(() =>
  import("./pages/questions/questions.component")
)

const FlashcardPage = loadable(() =>
  import("./pages/flashcards/flashcards.component")
)

const Notespage = loadable(() =>
  import("./pages/notespage/notespage.component")
)

const Mainpage = loadable(() => import("./pages/main-page/main-page.component"))

const Videopage2 = loadable(() =>
  import("./pages/videopage2/videopage2.component")
)

const Questionpage2 = loadable(() =>
  import("./pages/questions2/questions2.component")
)

// const SpecPage = loadable(() => {
//   import("./pages/specpage/specpage.component")
// })

// const Specvideos = loadable(() => {
//   import("./pages/specvideos/specvideos.component")
// })

class App extends Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        // When snapshot is updated
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? <Redirect to="/home" /> : <SignUp />
            }
          />
          <Route
            exact
            path="/home"
            // component={HomePage}
            render={() =>
              this.props.currentUser ? (
                <HomePage currentUser={this.props.currentUser} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route exact path="/courses/:id" component={CoursesPage} />
          <Route exact path="/teaching/:id" component={TeacherPage}></Route> */}
          <Route
            exact
            path="/subtopic/:topic_id/:subtopic_id"
            render={(props) => (
              <SubtopicPage {...props} currentUser={this.props.currentUser} />
            )}
          />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/terms-condition" component={TermsConditionPage} />
          <Route
            exact
            path="/video/:id"
            render={(props) => (
              <VideoPage {...props} currentUser={this.props.currentUser} />
            )}
          />
          <Route
            exact
            path="/specification"
            render={(props) => (
              <SpecPage {...props} currentUser={this.props.currentUser} />
            )}
          />
          <Route exact path="/spec/:id" component={Specvideos} />
          <Route exact path="/questions/:id" component={QuestionsPage} />
          <Route exact path="/flashcard/:id" component={FlashcardPage} />
          <Route exact path="/notes/:id" component={Notespage} />
          <Route
            exact
            path="/main"
            render={(props) => (
              <Mainpage {...props} currentUser={this.props.currentUser} />
            )}
          />
          <Route exact path="/videos2/:id" component={Videopage2} />
          <Route exact path="/questions2" component={Questionpage2} />
          {/* <Route
            path="/teaching/:id"
            render={(props) => {
              return <TeacherPage {...props} isEditable={true} />
            }}
          /> */}
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
})

const mapDispatchStateToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchStateToProps)(App)
