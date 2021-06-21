import React, { Component } from "react"
import { Button, Spinner } from "react-bootstrap"
import NavigationBar from "../../navigation/navigation-bar/navigation-bar.component"
// import AccordionCard from "../../components/accordion-card/accordion-card.component"
// import PleaseLink from "../../components/please-link/please-link.component"
// import PleaseProvide from "../../components/please-provide/please-provide.component"
// import AnalyticsParent from "../../components/analytics-parent/analytics-parent.component"
// import AnalyticsTeacher from "../../components/analytics-teacher/analytics-teacher.component"
// import AnalyticsStudents from "../../components/analytics-students/analytics-students.component"
// import CourseCard from "../../components/course-card/course-card.component"
// import JoinCourse from "../../components/join-course/join-course.component"
// import CreateCourse from "../../components/create-course/create-course.component"
import logo from "../../assets/logo.svg"
// import AnalyticsEmptyState from "../../assets/analytics-empty-state-2.svg"
import Feedback from "../../components/feedback/feedback.component"
import "./homepage.styles.scss"
import {
  joinCourse,
  fetchCourseAggregation,
  fetchCreatedCourses,
  fetchCourses,
  fetchPublicCourses,
  fetchAvailableCourses,
  createCourse,
  getCourseAggregation,
  getTopicsAggregation,
  getLessonsAggregation,
  fetchCourse,
  fetchStudentsFor,
  fetchStudent,
  updateUserInfo,
} from "./../../utils/firebase/firestore"
import history from "./../../history"

import { connect } from "react-redux"
import AdditionInformationForm from "../../components/addition-infomation-form"
import EdeqSearch from "../../components/edeq-search/edeq-search.component"
import TopicCard from "../../components/topic-card-new/topic-card-new.component"
import FeedbackModal from "../../components/feedback-modal/feedback-modal.component"
import { getTopics } from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: true,
      isLoading: false,
      isLoadingAnalytics: false,
      showAdditionalInfo: false,
      isFeedbackShown: false,
      courses: [],
      createdCourses: [],
      public_courses: [],
      topics: [],
    }
    this.sidebar_click = this.sidebar_click.bind(this)
    // this.fetchAvailableCourses()
    // // this.handleFetchCourses();
    // this.fetchCreatedCourses()
    // this.fetchPublicCourses()
    this.setState = this.setState.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  componentDidMount() {
    this.getTopics()
  }

  async getTopics() {
    const topics = await getTopics("chemistry", "OCR_A")
    this.setState({ topics: topics })
  }

  // fetchAggregations = () => {
  //   const { analytics_course, analytics_student } = this.state;
  //   if (analytics_course == undefined) return;
  //   getCourseAggregation(
  //     analytics_course.id,
  //     analytics_student ? analytics_student.id : undefined
  //   )
  //     .then((percentage) => {
  //       getTopicsAggregation(
  //         analytics_course.id,
  //         analytics_student ? analytics_student.id : undefined
  //       )
  //         .then((topics) => {
  //           getLessonsAggregation(
  //             analytics_course.id,
  //             analytics_student ? analytics_student.id : undefined
  //           )
  //             .then((lessons) => {
  //               this.setState({
  //                 course_aggr: {
  //                   percentage,
  //                   topics,
  //                   lessons,
  //                 },
  //               });
  //             })
  //             .catch((err) => {
  //               alert("Error aggregating the lessons" + err);
  //             });
  //         })
  //         .catch((err) => {
  //           alert("Error aggregating the topics" + err);
  //         });
  //     })
  //     .catch((err) => {
  //       alert("Error aggregating the course" + err);
  //     });
  // };

  // fetchAvailableCourses = async () => {
  //   const { currentUser } = this.props;
  //   if (currentUser.user_type != "student") return;
  //   if (currentUser) {
  //     const courses = await fetchAvailableCourses(currentUser.uid);
  //     this.setState({ courses });

  //     if (courses.length > 0) {
  //       this.setState({ analytics_course: courses[0] }, () => {
  //         this.fetchAggregations();
  //       });
  //     } else {
  //       this.setState({ hide_analytics: true });
  //     }
  //   }
  // };

  // fetchPublicCourses = async () => {
  //   const { currentUser } = this.props;
  //   if (currentUser.user_type != "student") return;
  //   if (currentUser) {
  //     const public_courses = await fetchPublicCourses(currentUser.uid);
  //     console.log("Public courses:", public_courses);
  //     this.setState({ public_courses });
  //   }
  // };

  // fetchCreatedCourses = () => {
  //   const { currentUser } = this.props;
  //   if (!currentUser) return;
  //   if (currentUser.user_type != "teacher") return;
  //   fetchCreatedCourses(currentUser.uid)
  //     .then((createdCourses) => {
  //       this.setState({ createdCourses });
  //       if (createdCourses.length > 0) {
  //         fetchStudentsFor(createdCourses[0].id)
  //           .then((students) => {
  //             this.setState(
  //               {
  //                 analytics_course: createdCourses[0],
  //                 students,
  //                 analytics_student:
  //                   students.length > 0 ? students[0] : undefined,
  //               },
  //               () => {
  //                 this.fetchAggregations();
  //               }
  //             );
  //           })
  //           .catch((err) => {
  //             console.log("fetch student:", err);
  //             alert("Fetch student error");
  //           });
  //       } else {
  //         this.setState({ hide_analytics: true });
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  // handleCreateCourse = () => {
  //   // fetch api here
  //   createCourse()
  //     .then((courseID) => {
  //       history.push("/teaching/" + courseID);
  //       // history.push('/teacher/?id=mockID&newcourse=true')
  //     })
  //     .catch((err) => {
  //       console.log("Error:", err.message);
  //     });
  // };

  // handleJoinCourse = (course_code, dropDownObj) => {
  //   joinCourse(course_code, dropDownObj)
  //     .then((course_id) => {
  //       history.push("/courses/" + course_id);
  //     })
  //     .catch((msg) => {
  //       console.log("actual err:", msg);
  //       alert(msg);
  //     });
  // };

  // handleFetchCourses = () => {
  //   const { currentUser } = this.props;
  //   if (!currentUser) return;
  //   fetchCourses(currentUser.uid)
  //     .then((courses) => {
  //       this.setState({ courses });
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  // handleChangeAnalyticsCourse = async (course_id) => {
  //   const analytics_course = await fetchCourse(course_id);
  //   console.log("new course id:", analytics_course);
  //   this.setState({ analytics_course }, () => {
  //     if (this.props.currentUser.user_type == "teacher") {
  //       fetchStudentsFor(analytics_course.id)
  //         .then((students) => {
  //           this.setState({ students }, () => {
  //             this.fetchAggregations();
  //           });
  //         })
  //         .catch((err) => {
  //           console.log("fetch student:", err);
  //           alert("Fetch student error");
  //         });
  //     } else {
  //       this.fetchAggregations();
  //     }
  //   });
  // };

  // handleChangeStudentCourse = async (student_id) => {
  //   const analytics_student = await fetchStudent(student_id);
  //   this.setState({ analytics_student });
  // };

  completeSignUp = (data) => {
    updateUserInfo(data)
  }

  // renderAnalytics = (userType) => {
  //   const { currentUser } = this.props;
  //   const {
  //     course_aggr,
  //     analytics_course,
  //     hide_analytics,
  //     analytics_student,
  //     students,
  //   } = this.state;
  //   if (hide_analytics) {
  //     return <img style={{ marginBottom: 32 }} src={AnalyticsEmptyState} />;
  //     // return;
  //   }
  //   console.log("analytics student:", analytics_student);
  //   switch (userType) {
  //     case "student":
  //       return course_aggr ? (
  //         <AnalyticsStudents
  //           user={currentUser}
  //           course={analytics_course}
  //           courses={this.state.courses}
  //           aggregation={course_aggr}
  //           handleChangeAnalyticsCourse={this.handleChangeAnalyticsCourse}
  //         />
  //       ) : (
  //         <div
  //           height="250"
  //           style={{
  //             height: 250,
  //             display: "flex",
  //             justifyContent: "center",
  //             justifyItems: "center",
  //           }}
  //         >
  //           <Spinner
  //             animation="border"
  //             variant="primary"
  //             style={{ marginTop: 90 }}
  //           />
  //         </div>
  //       );
  //     case "teacher":
  //       return course_aggr ? (
  //         <AnalyticsTeacher
  //           user={analytics_student}
  //           students={students}
  //           course={analytics_course}
  //           courses={this.state.createdCourses}
  //           aggregation={course_aggr}
  //           handleChangeAnalyticsCourse={this.handleChangeAnalyticsCourse}
  //         ></AnalyticsTeacher>
  //       ) : (
  //         <div
  //           height="250"
  //           style={{
  //             height: 250,
  //             display: "flex",
  //             justifyContent: "center",
  //             justifyItems: "center",
  //           }}
  //         >
  //           <Spinner
  //             animation="border"
  //             variant="primary"
  //             style={{ marginTop: 90 }}
  //           />
  //         </div>
  //       );
  //     case "tutor":
  //       return <AnalyticsTeacher></AnalyticsTeacher>;
  //     case "parent":
  //       return <AnalyticsParent></AnalyticsParent>;
  //   }
  // };

  // renderSections = (userType) => {
  //   switch (userType) {
  //     case "student":
  //       return (
  //         <div className="page__row">
  //           <div className="banner">
  //             <AccordionCard name="Learning" defaultActiveKey="0">
  //               {this.state.courses.map((course, index) => {
  //                 return (
  //                   <CourseCard key={index} course={course} type="courses" />
  //                 );
  //               })}
  //               <JoinCourse
  //                 handleJoinCourse={this.handleJoinCourse}
  //                 courses={this.state.public_courses}
  //               ></JoinCourse>
  //             </AccordionCard>
  //           </div>
  //         </div>
  //       );
  //     case "teacher":
  //       return (
  //         <React.Fragment>
  //           <div className="page__row">
  //             <div className="banner">
  //               <AccordionCard name="Teaching" defaultActiveKey="0">
  //                 {this.state.createdCourses.map((course, index) => {
  //                   return (
  //                     <CourseCard key={index} course={course} type="teaching" />
  //                   );
  //                 })}
  //                 <CreateCourse handleCreateCourse={this.handleCreateCourse} />
  //               </AccordionCard>
  //             </div>
  //           </div>

  //           {/* <div className="page__row">
  //             <div className="banner">
  //               <AccordionCard name="Learning" defaultActiveKey="0">
  //                 {this.state.courses.map((course, index) => {
  //                   return (
  //                     <CourseCard key={index} course={course} type="courses" />
  //                   );
  //                 })}

  //                 <JoinCourse
  //                   handleJoinCourse={this.handleJoinCourse}
  //                 ></JoinCourse>
  //               </AccordionCard>
  //             </div>
  //           </div> */}
  //         </React.Fragment>
  //       );
  //     case "tutor":
  //       return;
  //     case "parent":
  //       return;
  //   }
  // };

  hideModal() {
    this.setState((state) => {
      return {
        ...state,
        isFeedbackShown: false,
      }
    })
  }

  showModal() {
    this.setState((state) => {
      console.log("HEEY")
      return {
        ...state,
        isFeedbackShown: true,
      }
    })
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
    console.log("clicked")
  }
  render() {
    const { currentUser } = this.props

    let topicCards = <SpinnerPage />
    if (this.state.topics.length > 0) {
      topicCards = this.state.topics.map((topic) => {
        return (
          <TopicCard
            exam_board={topic.exam_board}
            name={topic.name}
            subject={topic.subject}
            id={topic.id}
          />
        )
      })
    }

    return (
      <>
        {this.state.isFeedbackShown ? (
          <FeedbackModal hideModal={this.hideModal} />
        ) : (
          ""
        )}
        <div className={this.state.isFeedbackShown ? "page blurred" : "page"}>
          <NavigationBar
            courses={this.state.courses}
            createdCourses={this.state.createdCourses}
          ></NavigationBar>
          {currentUser ? (
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
                {!currentUser.guardian && currentUser.user_type == "student" && (
                  <>
                    <Feedback showModal={this.showModal} />
                    <main>
                      <EdeqSearch />
                      {topicCards}
                    </main>
                  </>
                )}

                {/* {currentUser.school_email ||
                (currentUser.user_type != "student" && <PleaseProvide />)} */}

                {/* {this.renderAnalytics(currentUser.user_type)}
              {this.renderSections(currentUser.user_type)} */}
              </div>
            </div>
          ) : (
            <Spinner />
          )}

          {((currentUser.user_type == "student" && !currentUser.dob) ||
            (currentUser.user_type == "teacher" && !currentUser.position)) && (
            <AdditionInformationForm
              type={currentUser.user_type}
              show={true}
              handleCompleteSignUp={this.completeSignUp}
              handleHide={() => {
                console.log("handleHide")
              }}
              handleAction={() => {
                console.log("handleAction")
              }}
            />
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(HomePage)
