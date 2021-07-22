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
import Videopage2 from "./pages/videopage2/videopage2.component"
import Mainpage from "./pages/main-page/main-page.component"
import ReactGA from "react-ga"
import Questions2 from "./pages/questions2/questions2.component"

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

// const Mainpage = loadable(() => import("./pages/main-page/main-page.component"))

// const Videopage2 = loadable(() =>
//   import("./pages/videopage2/videopage2.component")
// )

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

    if (process.env.REACT_APP_projectId === "education-equation-testing") {
      ReactGA.initialize("UA-201626326-1")
    } else {
      ReactGA.initialize("UA-202036186-1")
    }
    if (this.props.currentUser) {
      ReactGA.set({ userId: this.props.currentUser.id })
    }

    window.performance.mark("end")
    window.performance.measure("time", "start", "end")
    const time = Math.round(
      window.performance.getEntriesByType("measure")[0].duration
    )
    ReactGA.timing({ category: "page", variable: "load", value: time })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    window.performance.mark("start")
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return this.props.currentUser ? (
                <Redirect to="/home" />
              ) : (
                <SignUp />
              )
            }}
          />
          <Route
            exact
            path="/home"
            // component={HomePage}
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return this.props.currentUser ? (
                <HomePage currentUser={this.props.currentUser} />
              ) : (
                <Redirect to="/" />
              )
            }}
          />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route exact path="/courses/:id" component={CoursesPage} />
          <Route exact path="/teaching/:id" component={TeacherPage}></Route> */}
          <Route
            exact
            path="/subtopic/:topic_id/:subtopic_id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return (
                <SubtopicPage {...props} currentUser={this.props.currentUser} />
              )
            }}
          />
          <Route
            exact
            path="/settings"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return <SettingsPage {...props} />
            }}
          />
          <Route exact path="/terms-condition" component={TermsConditionPage} />
          <Route
            exact
            path="/video/:id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return (
                <VideoPage {...props} currentUser={this.props.currentUser} />
              )
            }}
          />
          <Route
            exact
            path="/specification"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return (
                <SpecPage {...props} currentUser={this.props.currentUser} />
              )
            }}
          />
          <Route
            exact
            path="/spec/:id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return <Specvideos {...props} />
            }}
          />
          <Route
            exact
            path="/questions/:id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return <QuestionsPage {...props} />
            }}
          />
          <Route
            exact
            path="/flashcard/:id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return <FlashcardPage {...props} />
            }}
          />
          <Route
            exact
            path="/notes/:id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return <Notespage {...props} />
            }}
          />
          <Route
            exact
            path="/main"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return (
                <Mainpage {...props} currentUser={this.props.currentUser} />
              )
            }}
          />
          <Route
            exact
            path="/videos2/:id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return <Videopage2 {...props} />
            }}
          />
          <Route
            exact
            path="/questions2/:id"
            render={(props) => {
              ReactGA.pageview(props.location.pathname)
              return <Questions2 {...props} />
            }}
          />
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
