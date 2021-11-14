import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAhAc1tFPB4eOZcXqmSlfjIZ3GsA1hjXZY",
  authDomain: "stat-trax.firebaseapp.com",
  projectId: "stat-trax",
  storageBucket: "stat-trax.appspot.com",
  messagingSenderId: "191187372779",
  appId: "1:191187372779:web:f257d2a3cd89db18a90cae",
  measurementId: "G-6R6TNCZ3CS"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;