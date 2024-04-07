
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBXpKO2XXeV8NwNMMeCan9-3ZSIjH_jn6E",
  authDomain: "uploadingphotos-cc8b4.firebaseapp.com",
  projectId: "uploadingphotos-cc8b4",
  storageBucket: "uploadingphotos-cc8b4.appspot.com",
  messagingSenderId: "702576260453",
  appId: "1:702576260453:web:28a66614692d863f581d8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);