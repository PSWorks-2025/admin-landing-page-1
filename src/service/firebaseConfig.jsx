import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAmq4XW20robCSRP8muEInvKhIP5xDoUb0",
  authDomain: "landing-page-1-ee86d.firebaseapp.com",
  projectId: "landing-page-1-ee86d",
  storageBucket: "landing-page-1-ee86d.firebasestorage.app",
  messagingSenderId: "229283372291",
  appId: "1:229283372291:web:afa94d4b3792265fb2dd36",
  measurementId: "G-VY4CFYYS5W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
