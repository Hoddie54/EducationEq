import firebase from "./../../config/FirebasConfig"
import "firebase/firestore"
import {
  fetchUser,
  saveUserToFirestore,
  deleteAccountFromFirestore,
} from "./firestore"
import { iOS } from "../../utils/helpers/misc"
import { setCurrentUser } from "../redux/user/user.action"

export const auth = firebase.auth()
// Google Auth
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider)

export const registerTutoringUser = (data) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const user = result.user
        console.log("Successfully registered user!", user)
        if (user) {
          data.creation_date = Date.now()
          data.display_name = data.parent_name
          data.uid = user.uid
          data.lesson_credits = 0
          data.lessons_approved = false
          delete data.password
          saveUserToFirestore(data)
            .then(() => {
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        }
      })
      .catch((err) => {
        console.log("Registration Error", err.message)
        alert("Registration Error: " + err.message)
        reject(err)
      })
  })
}

export const registerUser = (data) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const user = result.user
        console.log("Successfully registered user!", user)
        if (user) {
          data.uid = user.uid
          data.creation_date = Date.now()
          data.display_name = data.full_name
          data.user_type = "tutoring"
          delete data.password
          saveUserToFirestore(data)
            .then(() => {
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        }
      })
      .catch((err) => {
        console.log("Registration Error", err.message)
        alert("Registration Error: " + err.message)
        reject(err)
      })
  })
}

export const loginUser = (email, password, changeErrorMessage) => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          console.log("Successfully logged in user!")

          // console.log(response.user)
          // console.log(iOS())
          // if (iOS()) {
          //   setCurrentUser(response.user)
          // }

          resolve(response)
        }
      })
      .catch((error) => {
        console.log("Login Error:", error.message)

        changeErrorMessage("Login Error: " + error.message)
        reject(error)
      })
  })
}

export const resetPassword = (email) => {
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
        console.log("Reset email sent! Check your inbox")
        resolve()
      })
      .catch(function (error) {
        // An error happened.
        alert("Reset Password Error:", error)
        reject(error)
      })
  })
}

export const deleteAccount = () => {
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser
    const uid = user.uid
    user
      .delete()
      .then(function () {
        // User deleted.
        console.log("User deleted")
        deleteAccountFromFirestore(uid)
          .then(() => {
            resolve()
          })
          .catch((error) => {
            console.log("Error deleting user from Firestore:", error.message)
            reject(error)
          })
      })
      .catch(function (error) {
        console.log("Error deleting user:", error.message)
        reject(error)
      })
  })
}

export const logoutUser = () => {
  auth
    .signOut()
    .then(function () {
      console.log("Successfully logged out!")
    })
    .catch(function (error) {
      console.log(error)
    })
}
