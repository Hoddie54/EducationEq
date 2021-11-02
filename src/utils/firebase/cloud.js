import { convertTo12HourTime } from "../helpers/misc"
import firebase from "./../../config/FirebasConfig"

/**
 *
 * @param {Object} classOptions - must contain title, start_time, end_time, date. Can contain other parameters
 * Check https://www.braincert.com/docs/api/vc/schedule.php for more info
 *
 * @returns Response from Cloud Function
 */
export const approveSubjects = (data) => {
  return new Promise((resolve, reject) => {
    const resolveSubjects = firebase
      .functions()
      .httpsCallable("approveSubjects")
    resolveSubjects(data)
      .then((res) => {
        console.log("Approve subjects")
        alert(res.data)
        resolve(res)
      })
      .catch((err) => {
        console.log("ERROR approving subjects")
        alert(err)
        reject(err)
      })
  })
}

export const addNewClass = (data) => {
  return new Promise((resolve, reject) => {
    const addClass = firebase.functions().httpsCallable("addNewClassFromAdmin")
    addClass(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const deleteClass = (class_uid) => {
  return new Promise((resolve, reject) => {
    const deleteClass = firebase
      .functions()
      .httpsCallable("deleteClassFromAdmin")

    deleteClass(class_uid)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const addStudentToClass = (data) => {
  return new Promise((resolve, reject) => {
    const addClass = firebase
      .functions()
      .httpsCallable("addStudentToClassFromAdmin")
    addClass(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const resolvePseudoclass = (data) => {
  return new Promise((resolve, reject) => {
    const resolvePseudoclass = firebase
      .functions()
      .httpsCallable("resolvePseudoclass")
    resolvePseudoclass(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const getPseudoclassAvailability = (data) => {
  return new Promise((resolve, reject) => {
    const getPseudoclassAvailability = firebase
      .functions()
      .httpsCallable("getPseudoclassAvailability")
    getPseudoclassAvailability(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const removeStudentFromClass = (data) => {
  return new Promise((resolve, reject) => {
    const addClass = firebase
      .functions()
      .httpsCallable("removeStudentFromClassFromAdmin")
    addClass(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const addMeToClass = (class_id) => {
  return new Promise((resolve, reject) => {
    const addMeToClass = firebase.functions().httpsCallable("addMeToClass")
    addMeToClass({ class_id: class_id })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const removeMeFromClass = (class_uid) => {
  return new Promise((resolve, reject) => {
    const removeMeFromClass = firebase
      .functions()
      .httpsCallable("removeMeFromClass")
    removeMeFromClass({ id: class_uid })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const getClassURL = (class_id) => {
  return new Promise((resolve, reject) => {
    const getClassURL = firebase.functions().httpsCallable("getClassURL")

    getClassURL({
      class_id: class_id,
      userName: firebase.auth().currentUser.displayName || "Username not found",
      lessonName: "Lesson",
      courseName: "Name",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const getPaymentIntent = (topupAmount) => {
  return new Promise((resolve, reject) => {
    const getPaymentIntent = firebase
      .functions()
      .httpsCallable("createPaymentIntent")

    getPaymentIntent({
      topupAmount: topupAmount,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

// export const addClass = (classOptions) => {
//   const addClass = firebase.functions().httpsCallable("addClass")
//   let data
//   addClass(...classOptions)
//     .then((res) => {
//       data = res
//       return data
//     })
//     .catch((error) => {
//       data = error
//       return data
//     })
//   //return data
// }
