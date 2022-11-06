import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtU1oL69GR5_ZZIRVu7OCvO7gfAf7a880",
  authDomain: "whatsapp-2-ea1e5.firebaseapp.com",
  projectId: "whatsapp-2-ea1e5",
  storageBucket: "whatsapp-2-ea1e5.appspot.com",
  messagingSenderId: "1082365949251",
  appId: "1:1082365949251:web:d20d64a2a63f177cfc2bf6"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };