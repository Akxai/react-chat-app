import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzK8ibdlB7Ck_96GcmK_9jFCf_0woMxoQ",
  authDomain: "chat-72eea.firebaseapp.com",
  projectId: "chat-72eea",
  storageBucket: "chat-72eea.appspot.com",
  messagingSenderId: "616403604207",
  appId: "1:616403604207:web:a1337f31074cbfa6dcc11a",
  measurementId: "G-0DBXBCPQZN",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
const analytics = getAnalytics(app);
