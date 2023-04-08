import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDp5ydk_02lvxAjGsqiUz3acCul0gUi5Qs",
    authDomain: "mymoney-49377.firebaseapp.com",
    projectId: "mymoney-49377",
    storageBucket: "mymoney-49377.appspot.com",
    messagingSenderId: "3559075064",
    appId: "1:3559075064:web:071650825da4b585cedf0d"
  };

  firebase.initializeApp(firebaseConfig);

  const projectFireStore = firebase.firestore();

  const projectAuth = firebase.auth()

  const timeStamp = firebase.firestore.Timestamp

  export {projectFireStore, projectAuth, timeStamp}