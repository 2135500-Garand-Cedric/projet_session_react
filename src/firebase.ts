// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFIznoSsXx-GFxAhoSS_p3oEhZXVxANWQ",
  authDomain: "projet-session-react.firebaseapp.com",
  projectId: "projet-session-react",
  storageBucket: "projet-session-react.appspot.com",
  messagingSenderId: "403575839481",
  appId: "1:403575839481:web:bdea189841418787922028",
  measurementId: "G-TVD1G6NJEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logInWithEmailAndPassword = async (
email: string,
password: string
) => {
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (err: any) {
    console.error(err);
    alert(err.message);
}
};
  
