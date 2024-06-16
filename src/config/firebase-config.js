import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgeIvf6QQnOb0U8rT4N6Xc8k7-HpR2JmA",
  authDomain: "mybewery-48f57.firebaseapp.com",
  projectId: "mybewery-48f57",
  storageBucket: "mybewery-48f57.appspot.com",
  messagingSenderId: "1025169311264",
  appId: "1:1025169311264:web:edd0f59cad67461f679e45",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
