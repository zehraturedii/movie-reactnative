// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA64QIsTm7y_dUNIiOAGNx87wWTU-Vmzhw",
  authDomain: "movieapp-e475f.firebaseapp.com",
  projectId: "movieapp-e475f",
  storageBucket: "movieapp-e475f.appspot.com",
  messagingSenderId: "450493177741",
  appId: "1:450493177741:web:857f6e9f17a4f0abc267c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

