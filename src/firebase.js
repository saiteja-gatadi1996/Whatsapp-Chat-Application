// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCw9FiAh6lshPU1ZG9E6VfUY5SPOHPbKV8",
  authDomain: "whatsapp-d7d9a.firebaseapp.com",
  databaseURL: "https://whatsapp-d7d9a.firebaseio.com",
  projectId: "whatsapp-d7d9a",
  storageBucket: "whatsapp-d7d9a.appspot.com",
  messagingSenderId: "1030538976299",
  appId: "1:1030538976299:web:9ab3b479d928cbd1c69e6e",
  measurementId: "G-7XB6N02VDX"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db= firebaseApp.firestore();
const auth= firebase.auth()
const provider=new firebase.auth.GoogleAuthProvider();

export{auth, provider};

export default db;
