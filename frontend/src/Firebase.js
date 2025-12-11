import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8ia-C_XbKJrEhV14H2RR9mPVGqLp4lYQ",
  authDomain: "technest-83167.firebaseapp.com",
  projectId: "technest-83167",
  storageBucket: "technest-83167.appspot.com",
  messagingSenderId: "794034614521",
  appId: "1:794034614521:web:eb31ad222ea95704a67228"
};
console.log("Storage bucket:", firebaseConfig.storageBucket);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);