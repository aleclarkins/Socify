import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4ERLR667TCmlnpFI3c0Jk_LTSKLY_Rn8",
  authDomain: "socify-a7183.firebaseapp.com",
  projectId: "socify-a7183",
  storageBucket: "socify-a7183.appspot.com",
  messagingSenderId: "145886115967",
  appId: "1:145886115967:web:64500f60dd5637801de74a",
  measurementId: "G-ZTG0JT5C3W",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage();

export { app, db, storage };
