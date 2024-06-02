// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVTcI5ey_1WIaYQfFyO32HQEkvqDjbeBI",
  authDomain: "medicamp-70825.firebaseapp.com",
  projectId: "medicamp-70825",
  storageBucket: "medicamp-70825.appspot.com",
  messagingSenderId: "33827499063",
  appId: "1:33827499063:web:bf46d880eccae2163363b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;