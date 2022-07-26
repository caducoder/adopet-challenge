import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCuhz80gmzjj4XzoxYXRWcVPj3Gve9Zhoo",
  authDomain: "adopet-f77db.firebaseapp.com",
  projectId: "adopet-f77db",
  storageBucket: "adopet-f77db.appspot.com",
  messagingSenderId: "720710817658",
  appId: "1:720710817658:web:df30e0a1b8e400c74728c3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);