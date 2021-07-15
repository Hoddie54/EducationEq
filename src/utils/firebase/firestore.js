import firebase from "./../../config/FirebasConfig"
import "firebase/firestore"

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return
  const userRef = firebase.firestore().doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  if (!snapShot.exists) {
    const { first_name, last_name, email } = userAuth
    const creation_date = Date.now()
    try {
      userRef.set({
        first_name,
        last_name,
        email,
        creation_date,
        ...additionalData,
      })
    } catch (error) {
      console.log("Error creating user:", error.message)
    }
  }
  return userRef
}

export const sendFeedback = (feedback) => {
  return new Promise((resolve, reject) => {
    console.log(firebase.auth().currentUser)
    firebase
      .firestore()
      .collection("feedback")
      .add({
        feedback: feedback,
        user_name: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
      })
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log("Error sending feedback: ", error)
        reject(error)
      })
  })
}

export const getAllDataForVideopage2 = (specpoint_uid) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("specpoints2")
      .doc(specpoint_uid)

    const thenClause = (doc) => {
      if (doc.empty) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        console.log("Reads :", 1)
        var source = doc.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
        resolve({ ...doc.data(), id: doc.id })
      }
    }
    const catchClause = (error) => {
      console.log("Error getting videos: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }
    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getAllDataForMainpage = (subject, exam_board) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("topics2")
      .where("subject", "==", subject)
      .where("exam_board", "==", exam_board)

    const thenClause = (querySnapshot) => {
      if (querySnapshot.empty) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        console.log("Reads :", querySnapshot.size)
        var source = querySnapshot.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
        resolve(querySnapshot.docs[0].data())
      }
    }

    const catchClause = (error) => {
      console.log("Error getting all data: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }

    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getVideosFromSpecpoint = (specpoint) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("videos")
      .where("specpoints", "array-contains", specpoint)

    const thenClause = (querySnapshot) => {
      if (querySnapshot.empty) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        let videos = []
        querySnapshot.forEach((doc) => {
          videos.push({ ...doc.data(), id: doc.id })
        })
        console.log("Reads :", querySnapshot.size)
        var source = querySnapshot.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
        resolve(videos)
      }
    }
    const catchClause = (error) => {
      console.log("Error getting videos: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }

    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getVideos = (topic, subtopic) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("videos")
      .where("topic_id", "==", topic)
      .where("subtopic_id", "==", subtopic)

    const thenClause = (querySnapshot) => {
      if (querySnapshot.empty) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        let videos = []
        querySnapshot.forEach((doc) => {
          videos.push({ ...doc.data(), id: doc.id })
        })
        console.log("Reads :", querySnapshot.size)
        var source = querySnapshot.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
        resolve(videos)
      }
    }
    const catchClause = (error) => {
      console.log("Error getting videos: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }

    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getVideo = (video) => {
  return new Promise((resolve, reject) => {
    const query = firebase.firestore().collection("videos").doc(video)

    const thenClause = (doc) => {
      if (doc.empty) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        console.log("Reads :", 1)
        var source = doc.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
        resolve({ ...doc.data(), id: doc.id })
      }
    }
    const catchClause = (error) => {
      console.log("Error getting videos: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }
    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getSpecpoint = (id) => {
  return new Promise((resolve, reject) => {
    const query = firebase.firestore().collection("specpoints").doc(id)

    const thenClause = (doc) => {
      if (doc.empty) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        console.log("Reads :", 1)
        var source = doc.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
        resolve({ ...doc.data(), id: doc.id })
      }
    }
    const catchClause = (error) => {
      console.log("Error getting specpoint: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }

    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getSpecpoints = (topic, subtopic) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("specpoints")
      .where("topic_id", "==", topic)
      .where("subtopic_id", "==", subtopic)
      .orderBy("order", "asc")

    const thenClause = (querySnapshot) => {
      if (querySnapshot.size === 0) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        let specpoints = []
        querySnapshot.forEach((doc) => {
          specpoints.push({ ...doc.data(), id: doc.id })
        })
        specpoints = specpoints.sort((a, b) => {
          return a.order - b.order
        })
        console.log("Reads :", querySnapshot.size)
        var source = querySnapshot.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
        resolve(specpoints)
      }
    }
    const catchClause = (error) => {
      console.log("Error getting specpoints: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }

    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getSubtopic = (topic, subtopic) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("topics")
      .doc(topic)
      .collection("subtopic")
      .doc(subtopic)

    const thenClause = (doc) => {
      if (doc.empty) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        resolve({ ...doc.data(), id: doc.id })
        console.log("Reads :", 1)
        var source = doc.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)
      }
    }
    const catchClause = (error) => {
      console.log("Error getting subtopics: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }

    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getSubtopics = (topic) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("topics")
      .doc(topic)
      .collection("subtopic")
      .orderBy("lesson_id", "asc")

    const thenClause = (querySnapshot) => {
      if (querySnapshot.size === 0) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        let subtopics = []
        querySnapshot.forEach((doc) => {
          subtopics.push({ ...doc.data(), id: doc.id })
        })

        console.log("Reads :", querySnapshot.size)
        var source = querySnapshot.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)

        resolve(subtopics)
      }
    }

    const catchClause = (error) => {
      console.log("Error getting subtopics: ", error)
      query.get().then(thenClause).catch(catchClause)
      reject(error)
    }

    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

export const getTopics = (subject, exam_board) => {
  return new Promise((resolve, reject) => {
    const query = firebase
      .firestore()
      .collection("topics")
      .where("subject", "==", subject)
      .where("exam_board", "==", exam_board)
      .orderBy("name", "asc")

    const thenClause = (querySnapshot) => {
      // console.log(querySnapshot.size)
      if (querySnapshot.size === 0) {
        query.get().then(thenClause).catch(catchClause)
      } else {
        let topics = []
        querySnapshot.forEach((doc) => {
          topics.push({ ...doc.data(), id: doc.id })
        })
        console.log("Reads :", querySnapshot.size)
        var source = querySnapshot.metadata.fromCache ? "local cache" : "server"
        console.log("Data came from " + source)

        resolve(topics)
      }
    }

    const catchClause = (error) => {
      console.log("Error getting topics: ", error)
      reject(error)
    }

    //let snap = query.get()
    query.get({ source: "cache" }).then(thenClause).catch(catchClause)
  })
}

// MARK: - READING
export const fetchUser = (uid) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data())
        }
      })
      .catch((err) => {
        console.log("Fetch User Error", err.message)
        reject(err)
      })
  })
}

export const fetchSchools = () => {
  return new Promise((resolve, reject) => {
    let query = firebase.firestore().collection("schools")
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          return
        }
        let schools = []
        querySnapshot.forEach((snap) => {
          schools.push(snap.data())
        })
        resolve(schools)
      },
      (error) => {
        console.log(error)
        console.log("Fetch schools Error", error.message)
        reject(error)
      }
    )
  })
}

// export const fetchCourse = (course_id, dropDownObj) => {
//   return new Promise((resolve, reject) => {
//     let query = firebase.firestore().collection("courses")
//     if (course_id) {
//       query = query.doc(course_id)
//     } else {
//       query = query = query.where("subject", "==", dropDownObj.subject)
//       query = query.where("level", "==", dropDownObj.level)
//       query = query.where("exam_board", "==", dropDownObj.examBoard)
//       query = query.where("is_public", "==", true)
//     }
//     query.onSnapshot(
//       (querySnapshot) => {
//         if (querySnapshot.empty) {
//           reject("This course does not exist. Please contact admin")
//           return
//         }
//         if (course_id && querySnapshot.data() == undefined) {
//           reject("This course does not exist. Please contact admin")
//           return
//         }

//         const course = course_id
//           ? querySnapshot.data()
//           : querySnapshot.docs[0].data()
//         resolve({
//           id: querySnapshot.id,
//           ...course,
//         })
//       },
//       (error) => {
//         console.log("Fetch course Error", error.message)
//         reject(error.message)
//       }
//     )
//   })
// }

// export const fetchCourses = (uid) => {
//   return new Promise((resolve, reject) => {
//     let query = firebase
//       .firestore()
//       .collection("courses")
//       .where("creator_id", "!=", uid)
//     query.onSnapshot(
//       (querySnapshot) => {
//         if (querySnapshot.empty) {
//           return
//         }
//         let courses = []
//         querySnapshot.forEach((snap) => {
//           courses.push({
//             id: snap.id,
//             ...snap.data(),
//           })
//         })
//         resolve(courses)
//       },
//       (error) => {
//         console.log(error)
//         console.log("Fetch courses Error", error.message)
//         reject(error)
//       }
//     )
//   })
// }

export const fetchPublicCourses = (uid) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .where("creator_id", "!=", uid)
      .where("is_public", "==", true)
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          return
        }
        let courses = []
        querySnapshot.forEach((snap) => {
          courses.push({
            id: snap.id,
            ...snap.data(),
          })
        })
        resolve(courses)
      },
      (error) => {
        console.log(error)
        console.log("Fetch public courses Error", error.message)
        reject(error)
      }
    )
  })
}

// export const fetchCreatedCourses = (uid) => {
//   return new Promise((resolve, reject) => {
//     let query = firebase
//       .firestore()
//       .collection("courses")
//       .where("owners", "array-contains", uid)
//     query.onSnapshot(
//       (querySnapshot) => {
//         if (querySnapshot.empty) {
//           resolve([])
//           return
//         }
//         let courses = []
//         querySnapshot.forEach((snap) => {
//           courses.push({
//             id: snap.id,
//             ...snap.data(),
//           })
//         })
//         resolve(courses)
//       },
//       (error) => {
//         console.log(error)
//         console.log("Fetch courses Error", error.message)
//         reject(error)
//       }
//     )
//   })
// }

// export const fetchAvailableCourses = (uid) => {
//   return new Promise((resolve, reject) => {
//     let query = firebase
//       .firestore()
//       .collection("users")
//       .doc(uid)
//       .collection("courses")

//     query.onSnapshot(
//       (querySnapshot) => {
//         if (querySnapshot.empty) {
//           resolve([])
//           return
//         }
//         let courses = []
//         querySnapshot.forEach((snap) => {
//           courses.push(snap.data())
//         })
//         resolve(courses)
//       },
//       (error) => {
//         console.log(error)
//         console.log("Fetch courses Error", error.message)
//         reject(error)
//       }
//     )
//   })
// }

export const fetchTopics = async (course_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")

    query.onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          return
        }
        let topics = []
        for (const snap of querySnapshot.docs) {
          const lessons = await fetchLessons(course_id, snap.id)
          const topic = { id: snap.id, lessons: lessons, ...snap.data() }
          topics.push(topic)
        }
        resolve(topics)
      },
      (error) => {
        console.log(error)
        console.log("Fetch topics Error", error.message)
        reject(error)
      }
    )
  })
}

export const fetchTopic = (course_id, topic_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve({})
        }
        resolve({
          id: querySnapshot.id,
          ...querySnapshot.data(),
        })
      },
      (error) => {
        console.log(error)
        console.log("Fetch topic Error", error.message)
        reject(error)
      }
    )
  })
}

export const fetchLesson = (course_id, topic_id, lesson_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve({})
        }
        resolve({
          id: querySnapshot.id,
          ...querySnapshot.data(),
        })
      },
      (error) => {
        console.log(error)
        console.log("Fetch lesson Error", error.message)
        reject(error)
      }
    )
  })
}

export const fetchStudent = (student_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase.firestore().collection("users").doc(student_id)
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve({})
        }
        resolve({
          id: querySnapshot.id,
          ...querySnapshot.data(),
        })
      },
      (error) => {
        console.log(error)
        console.log("Fetch student Error", error.message)
        reject(error)
      }
    )
  })
}

export const fetchLessons = async (course_id, topic_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
    query.onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve([])
          return
        }
        let lessons = []
        for (const snap of querySnapshot.docs) {
          const questions = await fetchQuestions(course_id, topic_id, snap.id)
          var lesson = { id: snap.id, questions: questions, ...snap.data() }
          lessons.push(lesson)
        }
        resolve(lessons)
      },
      (error) => {
        console.log(error)
        console.log("Fetch topics Error", error.message)
        reject(error)
      }
    )
  })
}

export const fetchQuestions = (course_id, topic_id, lesson_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
      .collection("questions")
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve([])
        }
        let questions = []
        if (Symbol.iterator in Object(querySnapshot.docs)) {
          querySnapshot.forEach((snap) => {
            var question = { id: snap.id, ...snap.data() }
            questions.push(question)
          })
        }
        resolve(questions)
      },
      (error) => {
        console.log(error)
        console.log("Fetch questions Error", error.message)
        reject(error)
      }
    )
  })
}

export const fetchQuestion = (course_id, topic_id, lesson_id, question_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
      .collection("questions")
      .doc(question_id)
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve({})
        }
        resolve({
          id: querySnapshot.id,
          ...querySnapshot.data(),
        })
      },
      (error) => {
        console.log(error)
        console.log("Fetch question Error", error.message)
        reject(error)
      }
    )
  })
}

export const fetchAnswers = (lesson_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("answers")
      .where("student_id", "==", firebase.auth().currentUser.uid)
      .where("lesson_id", "==", lesson_id)
    query.onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve([])
          return
        }
        const { course_id, topic_id } = querySnapshot.docs[0].data()
        const questions = await fetchQuestions(course_id, topic_id, lesson_id)
        var total_marks = questions.reduce(function (r, a) {
          return r + a.marks_available
        }, 0)

        let answers = []

        for (const snap of querySnapshot.docs) {
          const question = await fetchQuestion(
            course_id,
            topic_id,
            lesson_id,
            snap.data().question_id
          )
          answers.push({
            id: snap.id,
            question,
            ...snap.data(),
          })
        }
        const filteredAnswers = filtedAnswers(answers)
        resolve({
          questions_count: questions.length,
          questions_answered: filteredAnswers.length,
          current_mark: filteredAnswers.reduce(function (r, a) {
            return r + a.number_of_marks
          }, 0),
          total_marks,
          answers: filteredAnswers,
        })
      },
      (error) => {
        console.log(error)
        console.log("Fetch answers Error", error.message)
        reject(error)
      }
    )
  })
}

const filtedAnswers = (arr) => {
  const result = Object.values(
    arr.reduce((a, b) => {
      if (a[b.question_id]) {
        if (a[b.question_id].time_stamp < b.time_stamp)
          a[b.question_id] = {
            ...b,
          }
      } else
        a[b.question_id] = {
          ...b,
        }

      return a
    }, {})
  )
  return result
}

// MARK: - WRITING
export const saveUserToFirestore = (data) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(data.uid)
      .set(data, { merge: true })
      .then(() => {
        console.log("Successfully saved user to firestore!")
        resolve()
      })
      .catch((err) => {
        console.log("Save User to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const createCourse = () => {
  const data = {
    title: "Course Name",

    subject: "Subject",
    exam_board: "AQA",
    level: "GCSE",
    owners: [firebase.auth().currentUser.uid],
    creator_id: firebase.auth().currentUser.uid,
    date_created: Date.now(),
    is_public: false,
    is_verified: false,
    associated_email: false,
  }
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .add(data, { merge: true })
      .then((docRef) => {
        firebase
          .firestore()
          .collection("courses")
          .doc(docRef.id)
          .set({ class_code: docRef.id }, { merge: true })
          .then(() => {
            console.log("Successfully created course!")
            resolve(docRef.id)
          })
          .catch((err) =>
            reject("err saving class code to course:" + err.message)
          )
      })
      .catch((err) => {
        console.log("Create course Error", err.message)
        reject(err)
      })
  })
}

// export const joinCourse = async (course_code, dropDownObj) => {
//   const uid = firebase.auth().currentUser.uid
//   const course = await fetchCourse(
//     course_code ? course_code : undefined,
//     course_code ? undefined : dropDownObj
//   )
//   const joinedCourses = await fetchAvailableCourses(uid)

//   const data = {
//     id: course.id,
//     title: course.title,
//     subject: course.subject,
//     date_joined: Date(),
//   }
//   return new Promise((resolve, reject) => {
//     const joinedCoursesID = joinedCourses.map((course) => course.id)
//     if (joinedCoursesID.includes(course.id)) {
//       reject("You have already joined this course")
//     }
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(uid)
//       .collection("courses")
//       .doc(course.id)
//       .set(data, { merge: true }) // .add(data, { merge: true })
//       .then(() => {
//         firebase
//           .firestore()
//           .collection("courses")
//           .doc(course.id)
//           .collection("students")
//           .doc(uid)
//           .set({ uid: uid, date_joined: Date() })
//           .then(() => {
//             console.log("Successfully Saved student to course!:", data.id)
//             resolve(data.id)
//           })
//           .catch((err) => {
//             console.log("Save student to course Error", err.message)
//             reject("Could not save user to course")
//           })
//       })
//       .catch((err) => {
//         console.log("Join course Error", err.message)
//         reject("This course does not exist. Please contact admin")
//       })
//   })
// }

export const fetchStudentsFor = (course_id) => {
  return new Promise((resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("students")

    query.onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve([])
          return
        }
        let students = []
        for (const snap of querySnapshot.docs) {
          const student = await fetchStudent(snap.data().uid)
          students.push(student)
        }
        resolve(students)
      },
      (error) => {
        console.log(error)
        console.log("Fetch students Error", error.message)
        reject(error)
      }
    )
  })
}

export const saveCourseToFirestore = (data) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc()
      .set(data, { merge: true })
      .then(() => {
        console.log("Successfully saved course to firestore!")
        resolve()
      })
      .catch((err) => {
        console.log("Save Course to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const updateCourseDetails = (data) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(data.id)
      .set(data, { merge: true })
      .then(() => {
        console.log("Successfully updated course!")
        resolve()
      })
      .catch((err) => {
        console.log("Update Course Error", err.message)
        reject(err)
      })
  })
}

export const saveTopicToFirestore = (data) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(data.course_id)
      .collection("topics")
      .doc()
      .set(
        {
          ...data,
          creator_id: firebase.auth().currentUser.uid,
          date_created: Date.now(),
        },
        { merge: true }
      )
      .then(() => {
        console.log("Successfully saved topic to firestore!")
        resolve()
      })
      .catch((err) => {
        console.log("Save Course to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const updateTopic = (course_id, topic_id, topic) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .set(topic, { merge: true })
      .then(() => {
        console.log("Successfully updated topic!")
        resolve()
      })
      .catch((err) => {
        console.log("Update Topic Error", err.message)
        reject(err)
      })
  })
}

export const saveLessonToFirestore = (course_id, data) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(data.topic_id)
      .collection("lessons")
      .add(data)
      .then((docRef) => {
        resolve({
          id: docRef.id,
          ...data,
        })
      })
      .catch((err) => {
        console.log("Save Lesson to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const updateLesson = (course_id, topic_id, lesson_id, data) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
      .set(data, { merge: true })
      .then(() => {
        console.log("Successfully updated lesson!")
        resolve()
      })
      .catch((err) => {
        console.log("Update lesson Error", err.message)
        reject(err)
      })
  })
}

export const deleteQuestionsFromFirestore = async (
  course_id,
  topic_id,
  lesson_id
) => {
  let query = firebase
    .firestore()
    .collection("courses")
    .doc(course_id)
    .collection("topics")
    .doc(topic_id)
    .collection("lessons")
    .doc(lesson_id)
    .collection("questions")
  query
    .get()
    .then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        if (Symbol.iterator in Object(querySnapshot.docs)) {
          for (const snap of querySnapshot.docs) {
            await deleteQuestionFromFirestore(
              course_id,
              topic_id,
              lesson_id,
              snap.id
            )
          }
          return
        } else {
          console.log("Querysnapshot is not iteratable")
        }
      } else {
        console.log("Querysnapshot does not exist:", querySnapshot.docs)
      }
    })
    .catch((err) => {
      console.log(err)
      console.log("delete questions Error", err.message)
      return
    })
}

export const deleteQuestionFromFirestore = (
  course_id,
  topic_id,
  lesson_id,
  question_id
) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
      .collection("questions")
      .doc(question_id)
      .delete()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        console.log("delete question from Firestore Error", err.message)
        reject(err)
      })
  })
}

export const saveQuestionsToFirestore = async (
  course_id,
  topic_id,
  lesson_id,
  questions
) => {
  console.log("Saving q:", questions)

  return new Promise(async (resolve, reject) => {
    await deleteQuestionsFromFirestore(course_id, topic_id, lesson_id)
    questions &&
      (await questions.forEach(async (question) => {
        await saveQuestionToFirestore(course_id, topic_id, lesson_id, question)
      }))
    resolve()
  })
}

export const updateVideoLink = async (course_id, topic_id, lesson_id, link) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
      .set({ video_link: link }, { merge: true })
      .then(() => {
        console.log("Successfully updated video link to firestore!")
        resolve()
      })
      .catch((err) => {
        console.log("Update video link to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const saveQuestionToFirestore = async (
  course_id,
  topic_id,
  lesson_id,
  question
) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
      .collection("questions")
      .doc()
      .set(question, { merge: false })
      .then(() => {
        console.log("Successfully saved question to firestore!")
        resolve()
      })
      .catch((err) => {
        console.log("Save question to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const saveAnswerToFirestore = async (data) => {
  const uid = firebase.auth().currentUser.uid
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("answers")
      .doc()
      .set(data)
      .then(() => {
        console.log("Successfully saved answer to firestore!")
        resolve()
      })
      .catch((err) => {
        console.log("Save answer to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const saveAnswersToFirestore = async (data) => {
  var total_marks_achieved = 0
  var total_marks_available = 0
  var total_number_questions_answered = 0
  var total_number_questions_full_marks = 0

  const answers = data.map((val) => ({
    student_id: firebase.auth().currentUser.uid,
    ...val,
  }))
  if (answers.length == 0) return
  const aggr_ref = firebase
    .firestore()
    .collection("users")
    .doc(answers[0].student_id)
    .collection("courses")
    .doc(answers[0].course_id)
  return new Promise(async (resolve, reject) => {
    for (const answer of answers) {
      total_marks_achieved += answer.number_of_marks
      total_marks_available += answer.total_marks
      total_number_questions_answered += 1
      if (answer.number_of_marks == answer.total_marks) {
        total_number_questions_full_marks += 1
      }
      await saveAnswerToFirestore(answer).catch((err) => {
        reject(err)
      })
    }

    const fv = firebase.firestore.FieldValue
    aggr_ref
      .set(
        {
          ["total_marks_achieved"]: fv.increment(total_marks_achieved),
          ["total_marks_available"]: fv.increment(total_marks_available),
          ["total_number_questions_answered"]: fv.increment(
            total_number_questions_answered
          ),
          ["total_number_questions_full_marks"]: fv.increment(
            total_number_questions_full_marks
          ),

          ["topic_" + answers[0].topic_id + "_total_marks_achieved"]:
            fv.increment(total_marks_achieved),
          ["topic_" + answers[0].topic_id + "_total_marks_available"]:
            fv.increment(total_marks_available),
          ["topic_" + answers[0].topic_id + "_total_number_questions_answered"]:
            fv.increment(total_number_questions_answered),
          ["topic_" +
          answers[0].topic_id +
          "_total_number_questions_full_marks"]: 2,

          ["lesson_" + answers[0].lesson_id + "_total_marks_achieved"]:
            fv.increment(total_marks_achieved),
          ["lesson_" + answers[0].lesson_id + "_total_marks_available"]:
            fv.increment(total_marks_available),
          ["lesson_" +
          answers[0].lesson_id +
          "_total_number_questions_answered"]: fv.increment(
            total_number_questions_answered
          ),
          ["lesson_" +
          answers[0].lesson_id +
          "_total_number_questions_full_marks"]: fv.increment(
            total_number_questions_full_marks
          ),
        },
        { merge: true }
      )
      .then(() => {
        resolve()
      })
    // resolve();
  })
}

export const deleteAccountFromFirestore = (uid) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .delete()
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log("Error deleting user from Firestore:", error.message)
        reject(error)
      })
  })
}

export const deleteLessonFromFirestore = (course_id, topic_id, lesson_id) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(course_id)
      .collection("topics")
      .doc(topic_id)
      .collection("lessons")
      .doc(lesson_id)
      .delete()
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log("Error deleting lesson from Firestore:", error.message)
        reject(error)
      })
  })
}

// --- Analytics ---

// export const fetchCourseAggregation = (data) => {
//   const { user_id, course_id } = data
//   return new Promise((resolve, reject) => {
//     let query = firebase
//       .firestore()
//       .collection("users")
//       .doc(user_id)
//       .collection("courses")
//       .doc(course_id)

//     query.onSnapshot(
//       (querySnapshot) => {
//         if (querySnapshot.empty) {
//           return
//         }
//         resolve(querySnapshot.data())
//       },
//       (error) => {
//         console.log(error)
//         console.log("Fetch courses Error", error.message)
//         reject(error)
//       }
//     )
//   })
// }

export const uploadLesson = (data) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(data.course_id)
      .collection("topics")
      .doc(data.topic_id)
      .collection("lessons")
      .doc()
      .set(data, { merge: true })
      .then(() => {
        console.log("Successfully uploaded lesson to firestore!")
        resolve()
      })
      .catch((err) => {
        console.log("Upload lessson to Firestore Error", err.message)
        reject(err)
      })
  })
}

export const updateUserInfo = (data) => {
  const uid = firebase.auth().currentUser.uid
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(data, { merge: true })
      .then(() => {
        console.log("Successfully updated user info")
        resolve()
      })
      .catch((err) => {
        console.log("Update User Error", err.message)
        reject(err)
      })
  })
}

export const getCourseAggregation = (course_id, student_id) => {
  const uid = student_id ? student_id : firebase.auth().currentUser.uid
  return new Promise((resolve, reject) => {
    // let query = firebase
    //   .firestore()
    //   .collection("answers")
    //   .where("student_id", "==", uid)
    //   .where("course_id", "==", course_id);

    let query = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("courses")
      .doc(course_id)

    query.onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve(0)
          return
        }
        const marks = querySnapshot.data().total_marks_achieved
        const total_marks = querySnapshot.data().total_marks_available
        // querySnapshot.data();
        // const answers = querySnapshot.docs.map((snap) => snap.data());

        // const filteredAnswers = filtedAnswers(answers);
        // const marks = filteredAnswers.reduce(function (r, a) {
        //   return r + a.number_of_marks;
        // }, 0);
        // const total_marks = filteredAnswers.reduce(function (r, a) {
        //   return r + a.total_marks;
        // }, 0);
        const percentage = (marks / total_marks) * 100

        resolve(percentage)
      },
      (error) => {
        console.log("getCourseAggregation Error", error.message)
        reject(error)
      }
    )
  })
}

export const getTopicsAggregation = (course_id, student_id) => {
  return new Promise(async (resolve, reject) => {
    const topics = await fetchTopics(course_id)
    let result = []
    for (const topic of topics) {
      const topicAggregation = await getTopicAggregation(
        course_id,
        topic.id,
        student_id
      )
      result.push(topicAggregation)
    }
    result = result.sort((a, b) => (a.percentage < b.percentage ? 1 : -1))
    // console.log("================================");
    // console.log("Topics aggregation:", result);
    resolve(result)
  })
}

const getTopicAggregation = (course_id, topic_id, student_id) => {
  const uid = student_id ? student_id : firebase.auth().currentUser.uid
  return new Promise(async (resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("answers")
      .where("student_id", "==", uid)
      .where("topic_id", "==", topic_id)
    const topic = await fetchTopic(course_id, topic_id)
    query.onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve({
            title: topic.title,
            questions_answered: 0,
            questions_full_mark: 0,
            percentage: 0,
          })
          return
        }

        const answers = querySnapshot.docs.map((snap) => snap.data())
        const filteredAnswers = filtedAnswers(answers)
        const correctAnswers = filteredAnswers.filter(
          (answer) => answer.number_of_marks == answer.total_marks
        )
        const marks = filteredAnswers.reduce(function (r, a) {
          return r + a.number_of_marks
        }, 0)
        const total_marks = filteredAnswers.reduce(function (r, a) {
          return r + a.total_marks
        }, 0)
        const percentage = ((marks / total_marks) * 100).toFixed(0)

        const result = {
          title: topic.title,
          questions_answered: filteredAnswers.length,
          questions_full_mark: correctAnswers.length,
          percentage,
        }
        // console.log("Topic aggregation:", result);
        resolve(result)
      },
      (error) => {
        console.log("getCourseAggregation Error", error.message)
        reject(error)
      }
    )
  })
}

export const getLessonsAggregation = (course_id, student_id) => {
  const uid = firebase.auth().currentUser.uid

  return new Promise(async (resolve, reject) => {
    const topics = await fetchTopics(course_id)
    let result = []
    for (const topic of topics) {
      const lessons = await fetchLessons(course_id, topic.id)
      for (const lesson of lessons) {
        const lessonAggregation = await getLessonAggregation(
          course_id,
          topic.id,
          lesson.id,
          student_id
        )
        result.push(lessonAggregation)
      }
    }
    result = result.sort((a, b) => (a.percentage > b.percentage ? 1 : -1))
    // console.log("================================");
    // console.log("Lessons aggregation:", result);
    resolve(result.slice(0, 3))
  })
}

const getLessonAggregation = (course_id, topic_id, lesson_id, student_id) => {
  const uid = student_id ? student_id : firebase.auth().currentUser.uid
  return new Promise(async (resolve, reject) => {
    let query = firebase
      .firestore()
      .collection("answers")
      .where("student_id", "==", uid)
      .where("lesson_id", "==", lesson_id)

    const lesson = await fetchLesson(course_id, topic_id, lesson_id)
    const topic = await fetchTopic(course_id, topic_id)

    query.onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          resolve({
            topic_title: topic.title,
            lesson_title: lesson.title,
            percentage: 0,
          })
          return
        }

        const answers = querySnapshot.docs.map((snap) => snap.data())
        const filteredAnswers = filtedAnswers(answers)
        const marks = filteredAnswers.reduce(function (r, a) {
          return r + a.number_of_marks
        }, 0)
        const total_marks = filteredAnswers.reduce(function (r, a) {
          return r + a.total_marks
        }, 0)
        const percentage = ((marks / total_marks) * 100).toFixed(0)

        const result = {
          topic_title: topic.title,
          lesson_title: lesson.title,
          percentage,
        }
        // console.log("Lesson aggregation:", result);
        resolve(result)
      },
      (error) => {
        console.log("getCourseAggregation Error", error.message)
        reject(error)
      }
    )
  })
}
