import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgmu6zAHo-8IY0FzlMI3zKDJMPWs32oYg",
  authDomain: "todo-app-107c7.firebaseapp.com",
  projectId: "todo-app-107c7",
  storageBucket: "todo-app-107c7.firebasestorage.app",
  messagingSenderId: "514499770076",
  appId: "1:514499770076:web:33d27e384bf27a3d4a6619"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth,browserLocalPersistence);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();