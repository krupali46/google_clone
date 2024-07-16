import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrPhOGAAMbuhP_S5spBXu8UuVXoLb5f2Y",
  authDomain: "crud-login-fb.firebaseapp.com",
  projectId: "crud-login-fb",
  storageBucket: "gs://contact-clone.appspot.com",
  messagingSenderId: "2281680557",
  appId: "1:2281680557:web:08b7e366caa8f5bf39a024"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);

