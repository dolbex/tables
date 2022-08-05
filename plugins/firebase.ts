import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9p21ZLSJeJ4VHUzuYlzUbgeC0oeLSNYs",
  authDomain: "tables-c13cd.firebaseapp.com",
  projectId: "tables-c13cd",
  storageBucket: "tables-c13cd.appspot.com",
  messagingSenderId: "1670943247",
  appId: "1:1670943247:web:63ee1c8eccc60e8fe6897a",
};
const apps = getApps();

let firebaseApp = null;
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = apps[0];
}

const db = getFirestore(firebaseApp);

export default db;
