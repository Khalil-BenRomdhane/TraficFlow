// Import des fonctions nécessaires depuis le nouveau SDK Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3hmkqoHkAlx7A0mL22RAaX3dzWrli0tk",
  authDomain: "traficflowauth.firebaseapp.com",
  projectId: "traficflowauth",
  storageBucket: "traficflowauth.firebasestorage.app",
  messagingSenderId: "1020822509688",
  appId: "1:1020822509688:web:e856743ad2f482f693f58d",
  measurementId: "G-4HLRH9HP6Q"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export des services Firebase
export { auth, app, db, analytics };
