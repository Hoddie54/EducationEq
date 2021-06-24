// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAkM1dBVmsj00i2M1mk7ysNrGfXltB9GA0",
  // //apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: "education-equation.firebaseapp.com",
  // databaseURL: "https://education-equation.firebaseio.com",
  // projectId: "education-equation",
  // storageBucket: "education-equation.appspot.com",
  // messagingSenderId: "630703259485",
  // appId: "1:630703259485:web:7d921a833a634358ecf2b4",
  // measurementId: "G-8QPLGHXRZ9",
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
}

console.log(process.env)
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true })
  .catch((err) => {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })
export default firebase
