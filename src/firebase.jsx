// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWvqlClGCIWOhJmKr5X_IRzmMnKFGPV08",
  authDomain: "sample-ed932.firebaseapp.com",
  projectId: "sample-ed932",
  storageBucket: "sample-ed932.appspot.app",
  messagingSenderId: "738053603403",
  appId: "1:738053603403:web:60c11ce21e6608d1f30dce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app);
const auth = getAuth(app);

// Export the services
export { firestore, auth };
export default app;