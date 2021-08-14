import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyCZf7B1YaBMLLznlqj44DEYURLjy-1iGBs",
    authDomain: "tracelink-baa57.firebaseapp.com",
    projectId: "tracelink-baa57",
    storageBucket: "tracelink-baa57.appspot.com",
    messagingSenderId: "386130358618",
    appId: "1:386130358618:web:139581b1b1b3434512c363"
  };

 const fire = firebase.initializeApp(firebaseConfig);

  export default fire;