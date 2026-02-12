// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import type { Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBlhOAJVxC3S6Tqir4OuGrEH9iJdwF8QgI",
  authDomain: "conferenceleague-or-interpol.firebaseapp.com",
  projectId: "conferenceleague-or-interpol",
  storageBucket: "conferenceleague-or-interpol.firebasestorage.app",
  messagingSenderId: "476165334440",
  appId: "1:476165334440:web:759860c31d87e05fcca99d",
  measurementId: "G-ZQ8TGD2PJZ"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export { app, analytics };
